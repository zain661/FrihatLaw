// Self-contained CSS mockups used across the Kayan NHR marketing pages.
// Each one carries its own dark navy device/app frame so it reads cleanly
// whether it sits on a light or dark section.

const payrollRowsData = {
  ar: [
    { name: "سارة أحمد", role: "محاسبة", amount: "٤٬٢٠٠", status: "مدفوع" },
    { name: "خالد يوسف", role: "مطوّر", amount: "٥٬٠٠٠", status: "مدفوع" },
    { name: "منى سالم", role: "تسويق", amount: "٣٬٨٥٠", status: "قيد المعالجة" },
  ],
  en: [
    { name: "Sara Ahmad", role: "Accountant", amount: "4,200", status: "Paid" },
    { name: "Khaled Yousef", role: "Developer", amount: "5,000", status: "Paid" },
    { name: "Mona Salem", role: "Marketing", amount: "3,850", status: "Processing" },
  ],
};

const COPY = {
  ar: {
    payrollHeader: "مسير رواتب — تشرين الثاني",
    autoCalculated: "محتسب تلقائيًا",
    paid: "مدفوع",
    location: "الموقع الجغرافي",
    gpsVerified: "GPS محقّق",
    officeLabel: "مكتب رام الله الرئيسي",
    officeTime: "١٠:٠٢ ص",
    dashboard: "لوحة المؤشرات",
    last7Days: "آخر ٧ أيام",
    attendanceRate: "معدل الحضور",
    attendanceValue: "٩٧٪",
    reports: "التقارير",
    liveReports: "لحظية",
  },
  en: {
    payrollHeader: "Payroll — November",
    autoCalculated: "Auto-calculated",
    paid: "Paid",
    location: "Location",
    gpsVerified: "GPS Verified",
    officeLabel: "Ramallah Main Office",
    officeTime: "10:02 AM",
    dashboard: "Dashboard",
    last7Days: "Last 7 days",
    attendanceRate: "Attendance Rate",
    attendanceValue: "97%",
    reports: "Reports",
    liveReports: "Live",
  },
};

function MockupFrame({ children, className = "" }) {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div className="pointer-events-none absolute -inset-5 rounded-[36px] bg-gradient-to-br from-[#06BAEB]/25 to-[#0B5FA5]/10 blur-2xl" />
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#140F3A] via-[#123B7A] to-[#0B5FA5] shadow-[0_30px_70px_-20px_rgba(6,15,50,0.55)] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function PayrollMockup({ lang = "ar" }) {
  const t = COPY[lang];
  const rows = payrollRowsData[lang];
  const dir = lang === "ar" ? "rtl" : undefined;
  return (
    <MockupFrame>
      <div dir={dir} className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3.5">
        <span className="text-xs font-bold text-white/70">{t.payrollHeader}</span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#4ADE80]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
          {t.autoCalculated}
        </span>
      </div>
      <div dir={dir} className="divide-y divide-white/10">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#06BAEB] to-[#0B5FA5] text-xs font-bold text-white">
                {r.name[0]}
              </span>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{r.name}</p>
                <p className="text-[11px] text-white/50 leading-tight">{r.role}</p>
              </div>
            </div>
            <div className="text-end">
              <p className="text-sm font-bold text-white leading-tight">{r.amount} ₪</p>
              <span
                className={`text-[10px] font-bold ${r.status === t.paid ? "text-[#4ADE80]" : "text-[#FBBF24]"}`}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

export function AttendanceMockup({ lang = "ar" }) {
  const t = COPY[lang];
  const dir = lang === "ar" ? "rtl" : undefined;
  return (
    <MockupFrame className="p-5">
      <div dir={dir} className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-white/70">{t.location}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#4ADE80]/15 px-2.5 py-1 text-[10px] font-bold text-[#4ADE80]">
          <span className="material-symbols-outlined text-xs">verified</span>
          {t.gpsVerified}
        </span>
      </div>
      <div className="relative h-40 overflow-hidden rounded-xl bg-[#0B1339]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#22D3EE] ring-4 ring-[#22D3EE]/20" />
          </span>
        </div>
        <span className="absolute top-8 end-10 h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="absolute bottom-10 start-14 h-2.5 w-2.5 rounded-full bg-white/30" />
      </div>
      <div dir={dir} className="mt-4 flex items-center justify-between text-[11px] text-white/60">
        <span>{t.officeLabel}</span>
        <span>{t.officeTime}</span>
      </div>
    </MockupFrame>
  );
}

export function AnalyticsMockup({ lang = "ar" }) {
  const t = COPY[lang];
  const dir = lang === "ar" ? "rtl" : undefined;
  const bars = [40, 65, 50, 80, 55, 70, 60];
  return (
    <MockupFrame className="p-5">
      <div dir={dir} className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-white/70">{t.dashboard}</span>
        <span className="text-[10px] font-bold text-white/40">{t.last7Days}</span>
      </div>
      <div className="mb-4 flex h-24 items-end gap-2 rounded-xl border border-white/10 bg-white/[0.05] p-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-[#06BAEB]/70 to-[#22D3EE]/40"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div dir={dir} className="grid grid-cols-2 gap-2.5">
        <div className="rounded-lg bg-white/[0.06] p-2.5 text-center">
          <p className="text-[10px] text-white/60">{t.attendanceRate}</p>
          <p className="text-sm font-bold text-white">{t.attendanceValue}</p>
        </div>
        <div className="rounded-lg bg-white/[0.06] p-2.5 text-center">
          <p className="text-[10px] text-white/60">{t.reports}</p>
          <p className="text-sm font-bold text-white">{t.liveReports}</p>
        </div>
      </div>
    </MockupFrame>
  );
}
