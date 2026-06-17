"use client";
import { useState, useEffect, useCallback } from "react";

const STATUS_STYLE: Record<string,string> = {
  on_trip:   "bg-orange-50 text-orange-700 border border-orange-200",
  available: "bg-green-50 text-green-700 border border-green-200",
  offline:   "bg-[#F5F1EB] text-[#B0A898] border border-[#E8E0D0]",
};
const VEHICLE_TYPES = ["sedan","suv","luxury","van","stretch_limo","minibus"];
const EMPTY_CREATE = { firstName:"", lastName:"", email:"", password:"", phone:"", city:"", vehicle_category:"sedan", vehicle_make:"", vehicle_model:"", vehicle_year:"", vehicle_plate:"" };
const VEH_LABEL: Record<string,string> = { sedan:"Sedan", suv:"SUV", luxury:"Luxury Sedan", van:"Van / People Mover", stretch_limo:"Limousine", minibus:"Minibus" };

function Modal({ title, onClose, children, wide=false }: { title:string; onClose:()=>void; children:React.ReactNode; wide?:boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.45)" }}>
      <div className={`bg-white rounded-2xl shadow-xl w-full border border-[#E8E0D0] max-h-[90vh] overflow-y-auto ${wide?"max-w-2xl":"max-w-lg"}`}>
        <div className="flex items-center justify-between p-6 border-b border-[#F0EBE2]">
          <h2 className="text-[#1C1611] font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#B0A898] hover:text-[#1C1611] text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ExpiryBadge({ date, label }: { date?:string; label:string }) {
  if (!date) return null;
  const days = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
  if (days > 30) return null;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${days<=0?"bg-red-50 text-red-700 border-red-200":"bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
      {label}: {days<=0?"Expired":`${days}d`}
    </span>
  );
}

const inp = "w-full border border-[#E8E0D0] rounded-xl px-3 py-2.5 text-sm text-[#1C1611] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20";
const sel = inp + " bg-white";

export default function DriversPage() {
  const [drivers,      setDrivers]      = useState<any[]>([]);
  const [search,       setSearch]       = useState("");
  const [loading,      setLoading]      = useState(true);
  const [approving,    setApproving]    = useState<string|null>(null);
  const [checkingDocs, setCheckingDocs] = useState(false);
  const [docAlerts,    setDocAlerts]    = useState<string[]|null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  // Modals
  const [showInvite,   setShowInvite]   = useState(false);
  const [viewing,      setViewing]      = useState<any|null>(null);
  const [editExpiry,   setEditExpiry]   = useState(false);

  const [createForm, setCreateForm] = useState(EMPTY_CREATE);
  const [creating,   setCreating]   = useState(false);
  const [createErr,  setCreateErr]  = useState("");
  const [createdDriver, setCreatedDriver] = useState<any>(null);
  const [showPass,   setShowPass]   = useState(false);

  const [expiryFields, setExpiryFields] = useState<any>({});
  const [savingExpiry, setSavingExpiry] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/drivers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setDrivers(data.drivers || []);
    } catch {}
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const approve = async (id: string, approved: boolean) => {
    setApproving(id);
    try {
      await fetch("/api/admin/driver/approve", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ driverId: id, approved }),
      });
      setDrivers(prev => prev.map(d => d.id===id ? { ...d, approved } : d));
      if (viewing?.id===id) setViewing((v:any) => ({ ...v, approved }));
    } catch {}
    finally { setApproving(null); }
  };

  const handleCheckDocuments = async () => {
    setCheckingDocs(true); setDocAlerts(null);
    try {
      const res  = await fetch("/api/admin/driver/check-documents", { method:"POST" });
      const data = await res.json();
      setDocAlerts(data.alerts || []);
    } catch { setDocAlerts([]); }
    finally { setCheckingDocs(false); }
  };

  const handleCreate = async () => {
    if (!createForm.firstName || !createForm.lastName || !createForm.email || !createForm.password) {
      setCreateErr("First name, last name, email and password are required."); return;
    }
    if (createForm.password.length < 6) { setCreateErr("Password must be at least 6 characters."); return; }
    setCreating(true); setCreateErr("");
    try {
      const res  = await fetch("/api/admin/driver/create", {
        method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(createForm),
      });
      const data = await res.json();
      if (!res.ok) { setCreateErr(data.error || "Failed to create driver account"); return; }
      setCreatedDriver({ ...data.driver, password: createForm.password });
      load();
    } catch { setCreateErr("Network error"); }
    finally { setCreating(false); }
  };

  const resetCreate = () => {
    setShowInvite(false); setCreatedDriver(null); setCreateErr("");
    setCreateForm(EMPTY_CREATE); setShowPass(false);
  };

  const handleSaveExpiry = async () => {
    if (!viewing) return;
    setSavingExpiry(true);
    try {
      await fetch("/api/admin/driver/update-expiry", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ driverId: viewing.id, ...expiryFields }),
      });
      setViewing((v:any) => ({ ...v, ...expiryFields }));
      setDrivers(prev => prev.map(d => d.id===viewing.id ? { ...d, ...expiryFields } : d));
      setEditExpiry(false);
    } catch {}
    finally { setSavingExpiry(false); }
  };

  const filtered = filterStatus==="all" ? drivers
    : filterStatus==="pending" ? drivers.filter(d=>!d.approved)
    : filterStatus==="approved" ? drivers.filter(d=>d.approved)
    : drivers.filter(d => d.status===filterStatus);

  const approved = drivers.filter(d=>d.approved).length;
  const pending  = drivers.filter(d=>!d.approved).length;

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Drivers</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{approved} approved · {pending} pending approval</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCheckDocuments} disabled={checkingDocs} className="border border-[#E8E0D0] text-[#7A6F62] hover:text-[#1C1611] hover:border-[#C9A84C]/40 rounded-xl px-4 py-2.5 text-sm transition-colors disabled:opacity-60">
            {checkingDocs ? "Checking…" : "Check Docs"}
          </button>
          <button onClick={() => { setShowInvite(true); setCreateErr(""); setCreatedDriver(null); setCreateForm(EMPTY_CREATE); setShowPass(false); }} className="btn-gold text-sm">+ Create Driver Account</button>
        </div>
      </div>

      {docAlerts !== null && (
        <div className={`rounded-xl border p-4 text-sm ${docAlerts.length===0?"bg-green-50 border-green-200 text-green-700":"bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
          {docAlerts.length===0 ? "All driver documents are valid for at least 30 days." : (
            <><p className="font-semibold mb-2">Documents expiring within 30 days:</p><ul className="list-disc list-inside space-y-1">{docAlerts.map((a,i)=><li key={i}>{a}</li>)}</ul></>
          )}
        </div>
      )}

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search by name, email or city…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white border border-[#E8E0D0] text-[#1C1611] placeholder:text-[#B0A898] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
        <div className="flex gap-2 flex-wrap">
          {["all","approved","pending","available","on_trip","offline"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all whitespace-nowrap ${
                filterStatus===s ? "bg-[#C9A84C] text-[#1C1611]" : "bg-white border border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/40"
              }`}>
              {s.replace("_"," ")}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_,i) => (
            <div key={i} className="bg-white border border-[#E8E0D0] rounded-2xl p-5">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-full bg-[#E8E0D0] animate-pulse" /><div className="flex-1 space-y-2"><div className="h-4 bg-[#E8E0D0] rounded animate-pulse w-32" /><div className="h-3 bg-[#E8E0D0] rounded animate-pulse w-48" /></div></div>
            </div>
          ))}
        </div>
      ) : filtered.length===0 ? (
        <div className="text-center py-16 text-[#B0A898]">
          <p className="text-4xl mb-3">🚗</p>
          <p className="text-[#7A6F62] font-medium mb-1">No drivers found</p>
          <p className="text-sm">Invite a driver to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map(d => (
            <div key={d.id} className="bg-white border border-[#E8E0D0] hover:border-[#C9A84C]/50 hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)] rounded-2xl p-5 transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-lg flex-shrink-0">
                  {d.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-[#1C1611] font-semibold">{d.name}</h3>
                    {!d.approved && <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full">Pending</span>}
                    {d.status && <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${STATUS_STYLE[d.status]||""}`}>{d.status?.replace("_"," ")}</span>}
                  </div>
                  <p className="text-[#7A6F62] text-xs truncate">{d.vehicle || d.vehicle_type || "No vehicle assigned"}</p>
                  <p className="text-[#B0A898] text-xs">{[d.city, d.phone].filter(Boolean).join(" · ") || d.email}</p>
                </div>
              </div>
              {(d.license_expiry || d.insurance_expiry || d.registration_expiry) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <ExpiryBadge date={d.license_expiry}      label="Licence"      />
                  <ExpiryBadge date={d.insurance_expiry}    label="Insurance"    />
                  <ExpiryBadge date={d.registration_expiry} label="Registration" />
                </div>
              )}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#F0EBE2]">
                <div className="text-center">
                  <p className="text-[#1C1611] font-bold">{d.rating>0 ? `${d.rating}★` : "—"}</p>
                  <p className="text-[#B0A898] text-xs">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-[#1C1611] font-bold">{d.trips || 0}</p>
                  <p className="text-[#B0A898] text-xs">Trips</p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  {!d.approved ? (
                    <button onClick={()=>approve(d.id,true)} disabled={approving===d.id}
                      className="btn-gold text-xs py-1 px-3 w-full disabled:opacity-60">
                      {approving===d.id ? "…" : "Approve"}
                    </button>
                  ) : (
                    <button onClick={()=>{ setViewing(d); setEditExpiry(false); setExpiryFields({ license_expiry:d.license_expiry||"", insurance_expiry:d.insurance_expiry||"", registration_expiry:d.registration_expiry||"" }); }}
                      className="text-xs border border-[#E8E0D0] text-[#7A6F62] hover:text-[#1C1611] hover:border-[#C9A84C]/40 rounded-lg py-1 px-3 w-full transition-colors">
                      Manage
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Driver Account modal */}
      {showInvite && (
        <Modal title="Create Driver Account" onClose={resetCreate} wide>
          {createdDriver ? (
            /* ── Success screen — show credentials ── */
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                </div>
                <div>
                  <p className="text-green-800 font-semibold text-sm">Driver account created successfully!</p>
                  <p className="text-green-600 text-xs mt-0.5">Share the login credentials below with the driver.</p>
                </div>
              </div>

              <div className="bg-[#FAF8F4] border border-[#E8E0D0] rounded-xl p-5 space-y-4">
                <p className="text-xs font-bold text-[#7A6F62] uppercase tracking-wider">Login Credentials</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[#B0A898] text-xs mb-1">Driver Name</p>
                    <p className="text-[#1C1611] font-semibold">{createdDriver.name}</p>
                  </div>
                  <div>
                    <p className="text-[#B0A898] text-xs mb-1">Email / Login ID</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[#1C1611] font-mono font-semibold flex-1">{createdDriver.email}</p>
                      <button onClick={() => navigator.clipboard.writeText(createdDriver.email)}
                        className="text-xs text-[#C9A84C] hover:underline">Copy</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#B0A898] text-xs mb-1">Password</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[#1C1611] font-mono font-semibold flex-1 tracking-widest">
                        {showPass ? createdDriver.password : "••••••••"}
                      </p>
                      <button onClick={() => setShowPass(s => !s)} className="text-xs text-[#C9A84C] hover:underline">
                        {showPass ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => navigator.clipboard.writeText(createdDriver.password)}
                        className="text-xs text-[#C9A84C] hover:underline">Copy</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-xs font-semibold mb-1">Important</p>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Save these credentials now — the password cannot be retrieved later.
                  The driver can log in to the <strong>Driver mobile app</strong> using their email and password.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={resetCreate} className="flex-1 btn-gold text-sm">Done</button>
                <button onClick={() => { setCreatedDriver(null); setCreateForm(EMPTY_CREATE); setCreateErr(""); setShowPass(false); }}
                  className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">
                  Create Another
                </button>
              </div>
            </div>
          ) : (
            /* ── Create form ── */
            <div className="space-y-4">
              {createErr && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{createErr}</p>}

              <p className="text-xs font-bold text-[#7A6F62] uppercase tracking-wider">Personal Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">First Name *</label>
                  <input className={inp} placeholder="James" value={createForm.firstName} onChange={e=>setCreateForm(f=>({...f,firstName:e.target.value}))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Last Name *</label>
                  <input className={inp} placeholder="Wilson" value={createForm.lastName} onChange={e=>setCreateForm(f=>({...f,lastName:e.target.value}))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Phone</label>
                  <input className={inp} placeholder="+61 400 000 000" value={createForm.phone} onChange={e=>setCreateForm(f=>({...f,phone:e.target.value}))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">City</label>
                  <input className={inp} placeholder="Sydney" value={createForm.city} onChange={e=>setCreateForm(f=>({...f,city:e.target.value}))} />
                </div>
              </div>

              <p className="text-xs font-bold text-[#7A6F62] uppercase tracking-wider pt-2 border-t border-[#F0EBE2]">Login Credentials</p>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Email Address (Login ID) *</label>
                <input className={inp} type="email" placeholder="james.wilson@example.com" value={createForm.email} onChange={e=>setCreateForm(f=>({...f,email:e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Password *</label>
                <div className="relative">
                  <input className={inp} type={showPass ? "text" : "password"} placeholder="Minimum 6 characters" value={createForm.password} onChange={e=>setCreateForm(f=>({...f,password:e.target.value}))} />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#C9A84C] hover:underline">
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-[#B0A898] text-xs mt-1">Driver will use this email + password to log in to the mobile app.</p>
              </div>

              <p className="text-xs font-bold text-[#7A6F62] uppercase tracking-wider pt-2 border-t border-[#F0EBE2]">Vehicle Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Vehicle Type</label>
                  <select className={sel} value={createForm.vehicle_category} onChange={e=>setCreateForm(f=>({...f,vehicle_category:e.target.value}))}>
                    {VEHICLE_TYPES.map(v => <option key={v} value={v}>{VEH_LABEL[v]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Plate Number</label>
                  <input className={inp} placeholder="ABC 123" value={createForm.vehicle_plate} onChange={e=>setCreateForm(f=>({...f,vehicle_plate:e.target.value}))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Make</label>
                  <input className={inp} placeholder="Mercedes-Benz" value={createForm.vehicle_make} onChange={e=>setCreateForm(f=>({...f,vehicle_make:e.target.value}))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Model</label>
                  <input className={inp} placeholder="S-Class" value={createForm.vehicle_model} onChange={e=>setCreateForm(f=>({...f,vehicle_model:e.target.value}))} />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={resetCreate} className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">Cancel</button>
                <button onClick={handleCreate} disabled={creating} className="flex-1 btn-gold text-sm disabled:opacity-60">
                  {creating ? "Creating Account…" : "Create Driver Account"}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* Driver detail modal */}
      {viewing && (
        <Modal title={viewing.name} onClose={() => setViewing(null)} wide>
          <div className="space-y-5">
            {/* Status + approval */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {viewing.status && <span className={`text-sm px-3 py-1 rounded-full font-medium border ${STATUS_STYLE[viewing.status]||""}`}>{viewing.status.replace("_"," ")}</span>}
                {!viewing.approved && <span className="text-sm px-3 py-1 rounded-full font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">Pending Approval</span>}
                {viewing.approved && <span className="text-sm px-3 py-1 rounded-full font-medium bg-green-50 text-green-700 border border-green-200">✓ Approved</span>}
              </div>
              {!viewing.approved ? (
                <button onClick={()=>approve(viewing.id,true)} disabled={approving===viewing.id} className="btn-gold text-sm disabled:opacity-60">{approving===viewing.id?"…":"Approve Driver"}</button>
              ) : (
                <button onClick={()=>approve(viewing.id,false)} disabled={approving===viewing.id} className="text-sm px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-60">Revoke Approval</button>
              )}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Email",       viewing.email],
                ["Phone",       viewing.phone    || "—"],
                ["City",        viewing.city     || "—"],
                ["Vehicle",     viewing.vehicle  || viewing.vehicle_type || "—"],
                ["Rating",      viewing.rating>0 ? `${viewing.rating}★` : "—"],
                ["Total Trips", viewing.trips    || 0],
              ].map(([k,v]) => (
                <div key={k} className="bg-[#FAF8F4] rounded-xl p-3">
                  <p className="text-[#B0A898] text-xs mb-0.5">{k}</p>
                  <p className="text-[#1C1611] font-medium text-xs">{v}</p>
                </div>
              ))}
            </div>

            {/* Document expiry */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-[#7A6F62] uppercase tracking-wider">Document Expiry Dates</p>
                <button onClick={()=>setEditExpiry(e=>!e)} className="text-xs text-[#C9A84C] hover:underline">{editExpiry?"Cancel":"Edit"}</button>
              </div>
              {editExpiry ? (
                <div className="space-y-3">
                  {[
                    { key:"license_expiry",      label:"Driver's Licence" },
                    { key:"insurance_expiry",    label:"Vehicle Insurance" },
                    { key:"registration_expiry", label:"Registration" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-3">
                      <label className="text-xs text-[#7A6F62] w-36 flex-shrink-0">{label}</label>
                      <input type="date" value={expiryFields[key]||""} onChange={e=>setExpiryFields((f:any)=>({...f,[key]:e.target.value}))}
                        className="flex-1 text-xs border border-[#E8E0D0] rounded-lg px-2 py-1.5 text-[#1C1611] focus:outline-none focus:border-[#C9A84C]" />
                    </div>
                  ))}
                  <button onClick={handleSaveExpiry} disabled={savingExpiry} className="btn-gold text-xs py-1.5 px-4 disabled:opacity-60">{savingExpiry?"Saving…":"Save Dates"}</button>
                </div>
              ) : (
                <div className="space-y-2">
                  {[
                    { label:"Driver's Licence",   date: viewing.license_expiry },
                    { label:"Vehicle Insurance",  date: viewing.insurance_expiry },
                    { label:"Registration",       date: viewing.registration_expiry },
                  ].map(({ label, date }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-xs text-[#7A6F62]">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#1C1611] font-mono">{date || "Not set"}</span>
                        {date && <ExpiryBadge date={date} label="" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
