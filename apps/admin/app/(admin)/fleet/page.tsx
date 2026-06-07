"use client";
import { useState, useEffect, useCallback } from "react";

const CATEGORIES = ["sedan","suv","luxury","van","stretch_limo","minibus"];
const CAT_LABEL: Record<string,string> = {
  sedan:"Sedan", suv:"SUV", luxury:"Luxury Sedan", van:"Van / People Mover",
  stretch_limo:"Limousine", minibus:"Minibus",
};
const STATUS_STYLE: Record<string,string> = {
  on_trip:"bg-orange-50 text-orange-700 border border-orange-200",
  available:"bg-green-50 text-green-700 border border-green-200",
  offline:"bg-[#F5F1EB] text-[#B0A898] border border-[#E8E0D0]",
  maintenance:"bg-red-50 text-red-700 border border-red-200",
};

const EMPTY_FORM = { make:"", model:"", year: new Date().getFullYear(), plate:"", color:"", category:"sedan", capacity:3, status:"available", driver_id:"", notes:"" };

type Vehicle = typeof EMPTY_FORM & { id: string; driver: string };

function Modal({ title, onClose, children }: { title:string; onClose:()=>void; children:React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.4)" }}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-[#E8E0D0] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#F0EBE2]">
          <h2 className="text-[#1C1611] font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#B0A898] hover:text-[#1C1611] text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label:string; children:React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

const inp = "w-full border border-[#E8E0D0] rounded-xl px-3 py-2.5 text-sm text-[#1C1611] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20";
const sel = inp + " bg-white";

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers,  setDrivers]  = useState<any[]>([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);
  const [total,    setTotal]    = useState(0);

  const [showAdd,  setShowAdd]  = useState(false);
  const [editing,  setEditing]  = useState<Vehicle|null>(null);
  const [confirm,  setConfirm]  = useState<Vehicle|null>(null);
  const [form,     setForm]     = useState({ ...EMPTY_FORM });
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/fleet?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setVehicles(data.vehicles || []);
      setTotal(data.total || 0);
    } catch { /* keep */ }
    finally { setLoading(false); }
  }, [search]);

  const loadDrivers = async () => {
    try {
      const res  = await fetch("/api/admin/drivers?limit=100");
      const data = await res.json();
      setDrivers((data.drivers || []).filter((d:any) => d.approved));
    } catch {}
  };

  useEffect(() => { load(); }, [load]);
  useEffect(() => { loadDrivers(); }, []);

  const openAdd = () => { setForm({ ...EMPTY_FORM }); setError(""); setShowAdd(true); };
  const openEdit = (v: Vehicle) => { setForm({ ...v }); setError(""); setEditing(v); };

  const handleSubmit = async () => {
    if (!form.make || !form.model || !form.plate || !form.category) {
      setError("Make, model, plate and category are required."); return;
    }
    setSaving(true); setError("");
    try {
      const method = editing ? "PATCH" : "POST";
      const body   = editing ? { id: editing.id, ...form } : form;
      const res    = await fetch("/api/admin/fleet", { method, headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
      const data   = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); return; }
      setShowAdd(false); setEditing(null); load();
    } catch { setError("Network error"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (v: Vehicle) => {
    setSaving(true);
    try {
      await fetch("/api/admin/fleet", { method:"DELETE", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ id: v.id }) });
      setConfirm(null); load();
    } catch {}
    finally { setSaving(false); }
  };

  const filtered = filterStatus === "all" ? vehicles : vehicles.filter(v => v.status === filterStatus);
  const onTrip   = vehicles.filter(v => v.status === "on_trip").length;
  const avail    = vehicles.filter(v => v.status === "available").length;

  const VehicleForm = () => (
    <div className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Make *"><input className={inp} placeholder="Mercedes-Benz" value={form.make} onChange={e => setForm(f=>({...f,make:e.target.value}))} /></Field>
        <Field label="Model *"><input className={inp} placeholder="E-Class W213" value={form.model} onChange={e => setForm(f=>({...f,model:e.target.value}))} /></Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Year"><input className={inp} type="number" min={2000} max={2030} value={form.year} onChange={e => setForm(f=>({...f,year:Number(e.target.value)}))} /></Field>
        <Field label="Plate *"><input className={inp} placeholder="ABC 123" value={form.plate} onChange={e => setForm(f=>({...f,plate:e.target.value.toUpperCase()}))} /></Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Colour"><input className={inp} placeholder="Obsidian Black" value={form.color} onChange={e => setForm(f=>({...f,color:e.target.value}))} /></Field>
        <Field label="Capacity (pax)"><input className={inp} type="number" min={1} max={20} value={form.capacity} onChange={e => setForm(f=>({...f,capacity:Number(e.target.value)}))} /></Field>
      </div>
      <Field label="Category *">
        <select className={sel} value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}>
          {CATEGORIES.map(c => <option key={c} value={c}>{CAT_LABEL[c]}</option>)}
        </select>
      </Field>
      <Field label="Status">
        <select className={sel} value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value}))}>
          <option value="available">Available</option>
          <option value="offline">Offline</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </Field>
      <Field label="Assign Driver">
        <select className={sel} value={form.driver_id} onChange={e => setForm(f=>({...f,driver_id:e.target.value}))}>
          <option value="">— Unassigned —</option>
          {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </Field>
      <Field label="Notes">
        <textarea className={inp} rows={2} placeholder="Any notes…" value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} />
      </Field>
      <div className="flex gap-3 pt-2">
        <button onClick={() => { setShowAdd(false); setEditing(null); }} className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">Cancel</button>
        <button onClick={handleSubmit} disabled={saving} className="flex-1 btn-gold text-sm disabled:opacity-60">
          {saving ? "Saving…" : editing ? "Save Changes" : "Add Vehicle"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Fleet</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{total} vehicles · {onTrip} on trip · {avail} available</p>
        </div>
        <button onClick={openAdd} className="btn-gold text-sm">+ Add Vehicle</button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search make, model, plate…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white border border-[#E8E0D0] text-[#1C1611] placeholder:text-[#B0A898] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20" />
        <div className="flex gap-2">
          {["all","available","on_trip","offline","maintenance"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all whitespace-nowrap ${
                filterStatus===s ? "bg-[#C9A84C] text-[#1C1611]" : "bg-white border border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/40"
              }`}>
              {s.replace("_"," ")}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_,i) => (
            <div key={i} className="bg-white border border-[#E8E0D0] rounded-2xl p-5 space-y-3">
              <div className="h-4 bg-[#E8E0D0] rounded animate-pulse w-32" />
              <div className="h-3 bg-[#E8E0D0] rounded animate-pulse w-48" />
              <div className="h-3 bg-[#E8E0D0] rounded animate-pulse w-24" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#B0A898]">
          <p className="text-4xl mb-3">🚗</p>
          <p className="text-[#7A6F62] font-medium mb-1">No vehicles found</p>
          <p className="text-sm">Click "Add Vehicle" to add your first vehicle to the fleet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(v => (
            <div key={v.id} className="bg-white border border-[#E8E0D0] hover:border-[#C9A84C]/50 hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)] rounded-2xl p-5 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[#C9A84C] text-[10px] uppercase tracking-wider font-semibold">{CAT_LABEL[v.category] || v.category}</p>
                  <h3 className="text-[#1C1611] font-bold">{v.make} {v.model}</h3>
                  <p className="text-[#B0A898] text-xs">{v.year} · {v.color}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${STATUS_STYLE[v.status]||""}`}>
                  {v.status.replace("_"," ")}
                </span>
              </div>
              <div className="space-y-1.5 text-sm border-t border-[#F0EBE2] pt-4">
                <div className="flex justify-between">
                  <span className="text-[#B0A898] text-xs">Plate</span>
                  <span className="text-[#1C1611] font-mono text-xs font-semibold">{v.plate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0A898] text-xs">Capacity</span>
                  <span className="text-[#7A6F62] text-xs">{v.capacity} passengers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0A898] text-xs">Driver</span>
                  <span className="text-[#7A6F62] text-xs">{v.driver || "Unassigned"}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(v)} className="flex-1 text-xs border border-[#E8E0D0] text-[#7A6F62] hover:text-[#1C1611] hover:border-[#C9A84C]/40 rounded-lg py-2 transition-colors">
                  Edit
                </button>
                <button onClick={() => setConfirm(v)} className="flex-1 text-xs border border-red-200 text-red-600 hover:bg-red-50 rounded-lg py-2 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add modal */}
      {showAdd && <Modal title="Add New Vehicle" onClose={() => setShowAdd(false)}><VehicleForm /></Modal>}

      {/* Edit modal */}
      {editing && <Modal title={`Edit — ${editing.make} ${editing.model}`} onClose={() => setEditing(null)}><VehicleForm /></Modal>}

      {/* Delete confirm */}
      {confirm && (
        <Modal title="Remove Vehicle" onClose={() => setConfirm(null)}>
          <p className="text-[#7A6F62] text-sm mb-6">
            Are you sure you want to remove <strong className="text-[#1C1611]">{confirm.make} {confirm.model}</strong> ({confirm.plate}) from the fleet? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setConfirm(null)} className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">Cancel</button>
            <button onClick={() => handleDelete(confirm)} disabled={saving} className="flex-1 bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60">
              {saving ? "Removing…" : "Yes, Remove"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
