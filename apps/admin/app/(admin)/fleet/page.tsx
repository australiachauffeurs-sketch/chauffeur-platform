export default function FleetPage() {
  const vehicles = [
    { id:"V001", make:"Mercedes-Benz", model:"E-Class W213",     year:2023, plate:"ABC 123", color:"Obsidian Black", category:"sedan",        capacity:3, driver:"Marcus Thompson", status:"on_trip"   },
    { id:"V002", make:"Mercedes-Benz", model:"GLE 450",          year:2024, plate:"DEF 456", color:"Polar White",    category:"suv",          capacity:6, driver:"Ahmed Al-Rashid", status:"available" },
    { id:"V003", make:"Mercedes-Benz", model:"S-Class W223",     year:2023, plate:"GHI 789", color:"Graphite Grey",  category:"luxury",       capacity:3, driver:"Grace Nguyen",    status:"on_trip"   },
    { id:"V004", make:"Mercedes-Benz", model:"V-Class",          year:2022, plate:"JKL 012", color:"Obsidian Black", category:"van",          capacity:8, driver:"Robert Wilson",   status:"available" },
    { id:"V005", make:"Mercedes-Benz", model:"E-Class W213",     year:2023, plate:"MNO 345", color:"Polar White",    category:"sedan",        capacity:3, driver:"Lily Chen",       status:"offline"   },
    { id:"V006", make:"Lincoln",       model:"Town Car Stretch",  year:2022, plate:"PQR 678", color:"Gloss Black",   category:"stretch_limo", capacity:8, driver:"Unassigned",      status:"available" },
  ];

  const CAT_LABEL: Record<string,string> = { sedan:"Sedan", suv:"SUV", luxury:"Luxury", van:"Van", stretch_limo:"Limousine" };
  const STATUS_STYLE: Record<string,string> = {
    on_trip:   "bg-orange-50 text-orange-700",
    available: "bg-green-50 text-green-700",
    offline:   "bg-[#F5F1EB] text-[#B0A898]",
  };

  return (
    <div className="animate-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Fleet</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{vehicles.length} vehicles · {vehicles.filter(v=>v.status==="on_trip").length} on trip</p>
        </div>
        <button className="btn-gold text-sm">+ Add Vehicle</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white border border-[#E8E0D0] hover:border-[#C9A84C]/50 hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)] rounded-2xl p-5 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#C9A84C] text-[10px] uppercase tracking-wider">{CAT_LABEL[v.category] || v.category.replace("_"," ")}</p>
                <h3 className="text-[#1C1611] font-bold">{v.make} {v.model}</h3>
                <p className="text-[#B0A898] text-xs">{v.year} · {v.color}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${STATUS_STYLE[v.status]}`}>
                {v.status.replace("_"," ")}
              </span>
            </div>
            <div className="space-y-2 text-sm border-t border-[#F0EBE2] pt-4">
              <div className="flex justify-between">
                <span className="text-[#B0A898] text-xs">Plate</span>
                <span className="text-[#1C1611] font-mono text-xs">{v.plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0A898] text-xs">Capacity</span>
                <span className="text-[#7A6F62] text-xs">{v.capacity} passengers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0A898] text-xs">Driver</span>
                <span className="text-[#7A6F62] text-xs">{v.driver}</span>
              </div>
            </div>
            <button className="w-full mt-4 text-xs border border-[#E8E0D0] text-[#7A6F62] hover:text-[#1C1611] hover:border-[#C9A84C]/40 rounded-lg py-2 transition-colors">
              Manage Vehicle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
