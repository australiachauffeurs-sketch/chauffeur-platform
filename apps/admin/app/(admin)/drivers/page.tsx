"use client";
import { useState, useEffect, useCallback } from "react";

const STATUS_STYLE: Record<string, string> = {
  on_trip:   "bg-orange-50 text-orange-700",
  available: "bg-green-50 text-green-700",
  offline:   "bg-[#F5F1EB] text-[#B0A898]",
};

function ExpiryBadge({ date, label }: { date?: string; label: string }) {
  if (!date) return null;
  const d = new Date(date);
  const now = new Date();
  const daysLeft = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const expired  = daysLeft <= 0;
  const warning  = daysLeft <= 30 && daysLeft > 0;
  if (!expired && !warning) return null;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
      expired ? "bg-red-50 text-red-700 border-red-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
    }`}>
      {label}: {expired ? "Expired" : `${daysLeft}d`}
    </span>
  );
}

export default function DriversPage() {
  const [drivers,        setDrivers]        = useState<any[]>([]);
  const [search,         setSearch]         = useState("");
  const [loading,        setLoading]        = useState(true);
  const [approving,      setApproving]      = useState<string|null>(null);
  const [checkingDocs,   setCheckingDocs]   = useState(false);
  const [docAlerts,      setDocAlerts]      = useState<string[]|null>(null);
  const [editingExpiry,  setEditingExpiry]  = useState<string|null>(null);
  const [expiryFields,   setExpiryFields]   = useState<Record<string, { license_expiry?: string; insurance_expiry?: string; registration_expiry?: string }>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/drivers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setDrivers(data.drivers || []);
    } catch { /* keep existing */ }
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const handleApprove = async (id: string) => {
    setApproving(id);
    try {
      await fetch("/api/admin/driver/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId: id, approved: true }),
      });
      setDrivers(prev => prev.map(d => d.id === id ? { ...d, approved: true } : d));
    } catch { /* ignore */ }
    finally { setApproving(null); }
  };

  const handleCheckDocuments = async () => {
    setCheckingDocs(true);
    setDocAlerts(null);
    try {
      const res  = await fetch("/api/admin/driver/check-documents", { method: "POST" });
      const data = await res.json();
      setDocAlerts(data.alerts || []);
    } catch { setDocAlerts([]); }
    finally { setCheckingDocs(false); }
  };

  const handleSaveExpiry = async (driverId: string) => {
    const fields = expiryFields[driverId] || {};
    try {
      await fetch("/api/admin/driver/update-expiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId, ...fields }),
      });
      setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, ...fields } : d));
      setEditingExpiry(null);
    } catch { /* ignore */ }
  };

  const approved = drivers.filter(d => d.approved).length;
  const pending  = drivers.filter(d => !d.approved).length;

  return (
    <div className="animate-in space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Drivers</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{approved} approved · {pending} pending approval</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCheckDocuments}
            disabled={checkingDocs}
            className="btn-gold text-sm disabled:opacity-60">
            {checkingDocs ? "Checking…" : "Check Documents"}
          </button>
          <button className="btn-gold text-sm">+ Invite Driver</button>
        </div>
      </div>

      {docAlerts !== null && (
        <div className={`rounded-xl border p-4 text-sm ${docAlerts.length === 0 ? "bg-green-50 border-green-200 text-green-700" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
          {docAlerts.length === 0
            ? "All driver documents are valid for at least 30 days."
            : (<><p className="font-semibold mb-2">Documents expiring within 30 days:</p><ul className="list-disc list-inside space-y-1">{docAlerts.map((a, i) => <li key={i}>{a}</li>)}</ul></>)
          }
        </div>
      )}

      <input type="text" placeholder="Search by name or city…" value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-white border border-[#E8E0D0] text-[#1C1611] placeholder:text-[#B0A898] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20" />

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_,i) => (
            <div key={i} className="bg-white border border-[#E8E0D0] rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8E0D0] animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#E8E0D0] rounded animate-pulse w-32" />
                  <div className="h-3 bg-[#E8E0D0] rounded animate-pulse w-48" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : drivers.length === 0 ? (
        <div className="text-center py-16 text-[#B0A898]">
          <p className="text-lg text-[#7A6F62] mb-4">No results</p>
          <p>No drivers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {drivers.map(d => (
            <div key={d.id} className="bg-white border border-[#E8E0D0] hover:border-[#C9A84C]/50 hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)] rounded-2xl p-5 transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-lg flex-shrink-0">
                  {d.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[#1C1611] font-semibold">{d.name}</h3>
                    {!d.approved && <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full">Pending</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[d.status]||""}`}>{d.status?.replace("_"," ")}</span>
                  </div>
                  <p className="text-[#7A6F62] text-xs mt-1 truncate">{d.vehicle}</p>
                  <p className="text-[#B0A898] text-xs">{d.city} · {d.phone}</p>
                </div>
              </div>
              {/* Expiry badges */}
              {(d.license_expiry || d.insurance_expiry || d.registration_expiry) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <ExpiryBadge date={d.license_expiry}      label="Licence"      />
                  <ExpiryBadge date={d.insurance_expiry}    label="Insurance"    />
                  <ExpiryBadge date={d.registration_expiry} label="Registration" />
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#F0EBE2]">
                <div className="text-center">
                  <p className="text-[#1C1611] font-bold">{d.rating > 0 ? `${d.rating}★` : "—"}</p>
                  <p className="text-[#B0A898] text-xs">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-[#1C1611] font-bold">{d.trips}</p>
                  <p className="text-[#B0A898] text-xs">Trips</p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  {!d.approved ? (
                    <button
                      onClick={() => handleApprove(d.id)}
                      disabled={approving === d.id}
                      className="btn-gold text-xs py-1 px-3 w-full disabled:opacity-60">
                      {approving === d.id ? "…" : "Approve"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingExpiry(editingExpiry === d.id ? null : d.id);
                        if (!expiryFields[d.id]) {
                          setExpiryFields(prev => ({ ...prev, [d.id]: {
                            license_expiry:      d.license_expiry      || "",
                            insurance_expiry:    d.insurance_expiry    || "",
                            registration_expiry: d.registration_expiry || "",
                          }}));
                        }
                      }}
                      className="text-xs border border-[#E8E0D0] text-[#7A6F62] hover:text-[#1C1611] hover:border-[#C9A84C]/40 rounded-lg py-1 px-3 w-full transition-colors">
                      {editingExpiry === d.id ? "Close" : "Manage"}
                    </button>
                  )}
                </div>
              </div>

              {/* Expiry date editor */}
              {editingExpiry === d.id && (
                <div className="mt-3 pt-3 border-t border-[#F0EBE2] space-y-2">
                  <p className="text-xs font-semibold text-[#7A6F62] mb-1">Document Expiry Dates</p>
                  {[
                    { key: "license_expiry",      label: "Licence Expiry"      },
                    { key: "insurance_expiry",    label: "Insurance Expiry"    },
                    { key: "registration_expiry", label: "Registration Expiry" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <label className="text-xs text-[#B0A898] w-28 flex-shrink-0">{label}</label>
                      <input
                        type="date"
                        value={(expiryFields[d.id] as any)?.[key] || ""}
                        onChange={e => setExpiryFields(prev => ({
                          ...prev,
                          [d.id]: { ...(prev[d.id] || {}), [key]: e.target.value },
                        }))}
                        className="flex-1 text-xs border border-[#E8E0D0] rounded-lg px-2 py-1 text-[#1C1611] focus:outline-none focus:border-[#C9A84C]"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => handleSaveExpiry(d.id)}
                    className="btn-gold text-xs py-1 px-4 mt-1">
                    Save Dates
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
