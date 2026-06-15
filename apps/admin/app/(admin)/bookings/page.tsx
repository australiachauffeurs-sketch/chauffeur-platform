"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const STATUSES = ["all","pending","confirmed","in_progress","completed","cancelled"];
const STATUS_BADGE: Record<string,string> = {
  pending:        "bg-yellow-50 text-yellow-700 border border-yellow-200",
  confirmed:      "bg-blue-50 text-blue-700 border border-blue-200",
  in_progress:    "bg-orange-50 text-orange-700 border border-orange-200",
  driver_assigned:"bg-purple-50 text-purple-700 border border-purple-200",
  completed:      "bg-green-50 text-green-700 border border-green-200",
  cancelled:      "bg-red-50 text-red-700 border border-red-200",
};
const VEHICLES = ["sedan","suv","luxury","van","stretch_limo","minibus"];
const VEH_LABEL: Record<string,string> = { sedan:"Sedan", suv:"SUV", luxury:"Luxury Sedan", van:"Van / People Mover", stretch_limo:"Limousine", minibus:"Minibus" };
const PAY_METHODS = ["cash","bank_transfer","invoice","card"];

const EMPTY_FORM = {
  customer_name:"", customer_email:"", customer_phone:"",
  pickup_address:"", dropoff_address:"",
  scheduled_at:"", vehicle_category:"sedan",
  driver_id:"", payment_method:"cash", total_amount:"",
  notes:"",
};

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

const inp = "w-full border border-[#E8E0D0] rounded-xl px-3 py-2.5 text-sm text-[#1C1611] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20";
const sel = inp + " bg-white";

export default function BookingsPage() {
  const [bookings,  setBookings]  = useState<any[]>([]);
  const [total,     setTotal]     = useState(0);
  const [filter,    setFilter]    = useState("all");
  const [search,    setSearch]    = useState("");
  const [loading,   setLoading]   = useState(true);
  const [apiError,  setApiError]  = useState("");
  const [liveConn,  setLiveConn]  = useState(false);
  const [drivers,   setDrivers]   = useState<any[]>([]);
  const channelRef = useRef<any>(null);

  // Modals
  const [showNew,   setShowNew]   = useState(false);
  const [viewing,   setViewing]   = useState<any|null>(null);
  const [form,      setForm]      = useState({ ...EMPTY_FORM });
  const [saving,    setSaving]    = useState(false);
  const [formError, setFormError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setApiError("");
    try {
      const params = new URLSearchParams({ status: filter, search, limit: "50" });
      const res    = await fetch(`/api/admin/bookings?${params}`);
      const data   = await res.json();
      if (!res.ok || data.error) {
        setApiError(data.error || `API error ${res.status}`);
      }
      setBookings(data.bookings || []);
      setTotal(data.total || 0);
    } catch (e: any) {
      setApiError(e?.message || "Network error");
    }
    finally { setLoading(false); }
  }, [filter, search]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch("/api/admin/drivers?limit=100").then(r=>r.json()).then(d => setDrivers((d.drivers||[]).filter((x:any)=>x.approved))).catch(()=>{});
  }, []);

  useEffect(() => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) return;
      const { createClient } = require("@supabase/supabase-js");
      const supabase = createClient(url, key);
      const channel = supabase.channel("admin-bookings-rt")
        .on("postgres_changes", { event:"*", schema:"public", table:"bookings" }, () => load())
        .subscribe((s:string) => setLiveConn(s==="SUBSCRIBED"));
      channelRef.current = channel;
    } catch {}
    return () => { try { channelRef.current?.unsubscribe(); } catch {} };
  }, []); // eslint-disable-line

  const totalRevenue = bookings.filter(b => b.status !== "cancelled").reduce((s,b) => s+(b.amount||0), 0);

  const markPaid = async (bookingId: string) => {
    await fetch("/api/admin/booking/mark-paid", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ bookingId, paymentMethod:"cash" }),
    });
    load();
    if (viewing?.id === bookingId) setViewing((v:any) => ({ ...v, payment_status:"paid" }));
  };

  const updateStatus = async (bookingId: string, status: string, driver_id?: string | null) => {
    const body: any = { bookingId, status };
    if (driver_id !== undefined) body.driver_id = driver_id;
    await fetch("/api/admin/booking/status", {
      method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body),
    });
    load();
    if (viewing?.id === bookingId) setViewing((v:any) => ({ ...v, status, driver_id }));
  };

  const handleCreate = async () => {
    if (!form.pickup_address || !form.scheduled_at || !form.vehicle_category) {
      setFormError("Pickup address, date/time and vehicle type are required."); return;
    }
    setSaving(true); setFormError("");
    try {
      const res  = await fetch("/api/admin/booking/create", {
        method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({
          ...form, total_amount: form.total_amount ? Number(form.total_amount) : 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || "Failed to create booking"); return; }
      setShowNew(false); setForm({ ...EMPTY_FORM }); load();
    } catch { setFormError("Network error"); }
    finally { setSaving(false); }
  };

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[#1C1611] text-xl font-bold">All Bookings</h1>
            {liveConn && (
              <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
              </span>
            )}
          </div>
          <p className="text-[#B0A898] text-sm mt-0.5">{total} results · ${totalRevenue.toLocaleString()} revenue</p>
        </div>
        <button onClick={() => { setForm({ ...EMPTY_FORM }); setFormError(""); setShowNew(true); }} className="btn-gold text-sm">+ New Booking</button>
      </div>

      {/* API error banner */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <strong>Error loading bookings:</strong> {apiError}
        </div>
      )}

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search customer, booking ID…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white border border-[#E8E0D0] text-[#1C1611] placeholder:text-[#B0A898] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                filter===s ? "bg-[#C9A84C] text-[#1C1611]" : "bg-white border border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/40"
              }`}>
              {s.replace("_"," ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F0EBE2] text-[#B0A898] text-xs uppercase tracking-wider bg-[#FAF8F4]">
                {["ID","Customer","Route","Vehicle","Driver","Date","Amount","Status","Payment",""].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE2]">
              {loading ? Array(5).fill(0).map((_,i) => (
                <tr key={i}><td colSpan={10} className="px-4 py-4"><div className="h-4 bg-[#E8E0D0] rounded animate-pulse" /></td></tr>
              )) : bookings.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-[#B0A898]">No bookings found</td></tr>
              ) : bookings.map(b => (
                <tr key={b.id} className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="px-4 py-3.5 font-mono text-[#B0A898] text-xs">{String(b.id).slice(0,8).toUpperCase()}…</td>
                  <td className="px-4 py-3.5 text-[#1C1611] font-medium whitespace-nowrap">{b.customer}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-[#7A6F62] text-xs truncate max-w-[120px]">{b.pickup}</p>
                    {b.dropoff && <p className="text-[#B0A898] text-xs truncate max-w-[120px]">→ {b.dropoff}</p>}
                  </td>
                  <td className="px-4 py-3.5 text-[#7A6F62] text-xs capitalize whitespace-nowrap">{b.vehicle?.replace("_"," ")}</td>
                  <td className="px-4 py-3.5 text-[#7A6F62] text-xs whitespace-nowrap">{b.driver || "—"}</td>
                  <td className="px-4 py-3.5 text-[#B0A898] text-xs whitespace-nowrap">{b.date}</td>
                  <td className="px-4 py-3.5 text-[#1C1611] font-bold whitespace-nowrap">${b.amount}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_BADGE[b.status]||""}`}>
                      {b.status?.replace("_"," ")}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {b.payment_status !== "paid"
                      ? <button onClick={() => markPaid(b.id)} className="text-xs px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/30 text-green-700 hover:bg-green-500/20 font-semibold whitespace-nowrap">Mark Paid</button>
                      : <span className="text-xs text-green-600 font-semibold">✓ Paid</span>
                    }
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setViewing(b)} className="text-[#C9A84C] text-xs font-semibold hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking modal */}
      {showNew && (
        <Modal title="New Booking" onClose={() => setShowNew(false)} wide>
          <div className="space-y-4">
            {formError && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</p>}
            <p className="text-[#B0A898] text-xs">Customer details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Customer Name</label>
                <input className={inp} placeholder="Jane Smith" value={form.customer_name} onChange={e=>setForm(f=>({...f,customer_name:e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Email</label>
                <input className={inp} type="email" placeholder="jane@example.com" value={form.customer_email} onChange={e=>setForm(f=>({...f,customer_email:e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Phone</label>
                <input className={inp} placeholder="+61 400 000 000" value={form.customer_phone} onChange={e=>setForm(f=>({...f,customer_phone:e.target.value}))} />
              </div>
            </div>
            <p className="text-[#B0A898] text-xs pt-2 border-t border-[#F0EBE2]">Trip details</p>
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Pickup Address *</label>
              <input className={inp} placeholder="123 Queen St, Brisbane QLD" value={form.pickup_address} onChange={e=>setForm(f=>({...f,pickup_address:e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Dropoff Address</label>
              <input className={inp} placeholder="Brisbane Airport T1" value={form.dropoff_address} onChange={e=>setForm(f=>({...f,dropoff_address:e.target.value}))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Date & Time *</label>
                <input className={inp} type="datetime-local" value={form.scheduled_at} onChange={e=>setForm(f=>({...f,scheduled_at:e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Vehicle Type *</label>
                <select className={sel} value={form.vehicle_category} onChange={e=>setForm(f=>({...f,vehicle_category:e.target.value}))}>
                  {VEHICLES.map(v => <option key={v} value={v}>{VEH_LABEL[v]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Assign Driver</label>
                <select className={sel} value={form.driver_id} onChange={e=>setForm(f=>({...f,driver_id:e.target.value}))}>
                  <option value="">— Assign later —</option>
                  {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Payment Method</label>
                <select className={sel} value={form.payment_method} onChange={e=>setForm(f=>({...f,payment_method:e.target.value}))}>
                  {PAY_METHODS.map(m => <option key={m} value={m}>{m.replace("_"," ").replace(/\b\w/g,c=>c.toUpperCase())}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Total Amount (AUD)</label>
                <input className={inp} type="number" min={0} step={0.01} placeholder="0.00" value={form.total_amount} onChange={e=>setForm(f=>({...f,total_amount:e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5">Notes</label>
              <textarea className={inp} rows={2} placeholder="Special requests, meet & greet…" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowNew(false)} className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">Cancel</button>
              <button onClick={handleCreate} disabled={saving} className="flex-1 btn-gold text-sm disabled:opacity-60">{saving ? "Creating…" : "Create Booking"}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* View / Manage booking modal */}
      {viewing && (
        <Modal title={`Booking — ${String(viewing.id).slice(0,8).toUpperCase()}…`} onClose={() => setViewing(null)} wide>
          <div className="space-y-5">
            {/* Status row */}
            <div className="flex items-center justify-between">
              <span className={`text-sm px-3 py-1.5 rounded-full font-semibold ${STATUS_BADGE[viewing.status]||""}`}>
                {viewing.status?.replace("_"," ")}
              </span>
              <span className="text-[#7A6F62] text-xs">{viewing.date}</span>
            </div>
            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Customer",        viewing.customer],
                ["Pickup",          viewing.pickup],
                ["Drop-off",        viewing.dropoff || "Not specified"],
                ["Vehicle",         viewing.vehicle?.replace("_"," ")],
                ["Driver",          viewing.driver  || "Not assigned"],
                ["Amount",          `$${viewing.amount}`],
                ["Payment Method",  viewing.payment_method?.replace("_"," ") || "—"],
                ["Payment Status",  viewing.payment_status],
              ].map(([k,v]) => (
                <div key={k} className="bg-[#FAF8F4] rounded-xl p-3">
                  <p className="text-[#B0A898] text-xs mb-0.5">{k}</p>
                  <p className="text-[#1C1611] font-medium text-xs capitalize">{v}</p>
                </div>
              ))}
            </div>

            {/* Assign driver */}
            {viewing.status !== "completed" && viewing.status !== "cancelled" && (
              <div>
                <p className="text-xs font-semibold text-[#7A6F62] mb-2 uppercase tracking-wider">Assign / Change Driver</p>
                <div className="flex gap-2">
                  <select className={sel + " flex-1"} defaultValue={viewing.driver_id || ""} id="drv-sel">
                    <option value="">— Unassigned —</option>
                    {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  <button onClick={() => {
                    const drvSel = document.getElementById("drv-sel") as HTMLSelectElement;
                    updateStatus(viewing.id, drvSel.value ? "driver_assigned" : viewing.status, drvSel.value || null);
                  }} className="btn-gold text-xs px-4">Assign</button>
                </div>
              </div>
            )}

            {/* Status actions */}
            {viewing.status !== "completed" && viewing.status !== "cancelled" && (
              <div>
                <p className="text-xs font-semibold text-[#7A6F62] mb-2 uppercase tracking-wider">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {["pending","confirmed","in_progress","completed","cancelled"].map(s => (
                    <button key={s} onClick={() => updateStatus(viewing.id, s)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium capitalize transition-all ${
                        viewing.status===s
                          ? "bg-[#C9A84C] text-[#1C1611] border-[#C9A84C]"
                          : s==="cancelled"
                            ? "border-red-200 text-red-600 hover:bg-red-50"
                            : "border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/40"
                      }`}>
                      {s.replace("_"," ")}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment */}
            {viewing.payment_status !== "paid" && (
              <div className="flex justify-end">
                <button onClick={() => { markPaid(viewing.id); setViewing((v:any)=>({...v,payment_status:"paid"})); }}
                  className="text-sm px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 hover:bg-green-500/20 font-semibold transition-colors">
                  Mark as Paid
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
