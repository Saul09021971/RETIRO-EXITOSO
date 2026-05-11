        // --- 2. CALCULADORA ISR ---
        function IsrCalculator({ colors, waNumber }) {
            const [ingresoBruto, setIngresoBruto] = useState(1200000);
            const [aportacionMensual, setAportacionMensual] = useState(8500);
            const [isr, setIsr] = useState(30);
            const [inflacion, setInflacion] = useState(5);
            const [rendimientoPPR, setRendimientoPPR] = useState(3.5);
            const [showTable, setShowTable] = useState(false);

            const formatMXN = (amount) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(amount);

            const aportacionAnual = aportacionMensual * 12;
            const devolucionEstimada = aportacionAnual * (isr / 100);
            const crecimientoTotal = inflacion + rendimientoPPR + isr;
            
            const topeDeduccion = Math.min(ingresoBruto * 0.10, 198031);
            const excedeTope = aportacionAnual > topeDeduccion;

            let wInf = 0, wRen = 0, wIsr = 0;
            if (crecimientoTotal > 0) {
                wInf = (inflacion / crecimientoTotal) * 100;
                wRen = (rendimientoPPR / crecimientoTotal) * 100;
                wIsr = (isr / crecimientoTotal) * 100;
            }

            return (
                <div className="w-full bg-slate-50 font-sans text-slate-800 p-4 md:p-8 fade-in min-h-[80vh]">
                    <header className="max-w-6xl mx-auto mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3 justify-center md:justify-start">
                                <Landmark className="text-emerald-600 w-10 h-10" />
                                Proyección Fiscal PPR
                            </h1>
                            <p className="text-slate-500 mt-2 text-lg font-medium">Análisis de Beneficios y Crecimiento Patrimonial</p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-emerald-200">
                            Asesoría Confidencial
                        </div>
                    </header>

                    <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <section className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Calculator className="text-emerald-600 w-6 h-6" />
                                    <h2 className="text-xl font-bold text-slate-800">Parámetros del Cliente</h2>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">1. Ingresos Brutos Anuales</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="text-slate-400 w-5 h-5" /></div>
                                            <input type="number" value={ingresoBruto} onChange={e => setIngresoBruto(Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">2. Aportación Mensual al PPR</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PiggyBank className="text-slate-400 w-5 h-5" /></div>
                                            <input type="number" value={aportacionMensual} onChange={e => setAportacionMensual(Number(e.target.value))} className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none ${excedeTope ? 'border-amber-400' : 'border-slate-200'}`} />
                                        </div>
                                        <div className="mt-2 flex flex-col gap-1">
                                            <p className="text-xs text-slate-500 font-medium">= {formatMXN(aportacionAnual)} anuales proyectados</p>
                                            {excedeTope && (
                                                <p className="text-xs text-amber-600 flex items-start gap-1 bg-amber-50 p-2 rounded-lg mt-1">
                                                    <Info className="w-4 h-4 shrink-0" />
                                                    Atención: El monto anual excede el tope deducible (10% o 5 UMAs: <span>{formatMXN(topeDeduccion)}</span>). El beneficio aplicará hasta este tope.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <label className="block text-sm font-semibold text-slate-600">3. Tasa Marginal de ISR</label>
                                            <button onClick={() => setShowTable(true)} className="text-xs text-emerald-600 font-bold hover:text-emerald-700 underline transition-colors">Ver Tabla SAT</button>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Percent className="text-slate-400 w-5 h-5" /></div>
                                            <input type="number" value={isr} onChange={e => setIsr(Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">4. Inflación Proyectada (%)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><TrendingUp className="text-slate-400 w-5 h-5" /></div>
                                            <input type="number" step="0.1" value={inflacion} onChange={e => setInflacion(Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">5. Rendimiento Anual del PPR (%)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LineChart className="text-slate-400 w-5 h-5" /></div>
                                            <input type="number" step="0.1" value={rendimientoPPR} onChange={e => setRendimientoPPR(Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="lg:col-span-8 space-y-6">
                            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 opacity-10"><Landmark className="w-64 h-64" /></div>
                                <div className="relative z-10">
                                    <h3 className="text-emerald-300 font-semibold text-lg mb-1">Devolución Fiscal Estimada</h3>
                                    <p className="text-sm text-slate-300 mb-6">Dinero que el SAT te regresará en tu declaración anual al tener este PPR.</p>
                                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-emerald-800/50 pb-8 mb-6">
                                        <div className="text-5xl md:text-7xl font-black text-white tracking-tight">{formatMXN(devolucionEstimada)}</div>
                                        <div className="bg-emerald-500 text-emerald-950 px-4 py-2 rounded-xl font-bold text-lg mb-2 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5" /><span>+{isr}% de tu aportación anual</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-bold text-emerald-400 flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5" />Crecimiento Total de tu Dinero</h4>
                                            <p className="text-slate-300 text-sm leading-relaxed">Si miramos cómo crece tu aportación tan solo en el primer año, el efecto es multiplicador gracias a la protección contra la inflación, el rendimiento del plan y la deducción fiscal.</p>
                                        </div>
                                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-emerald-800/30">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-emerald-200">Retorno Total Proyectado</span>
                                                <span className="text-xl font-black text-emerald-400">{crecimientoTotal.toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full h-4 bg-slate-800 rounded-full flex overflow-hidden">
                                                <div className="bg-slate-500 transition-all" style={{width: `${wInf}%`}}></div>
                                                <div className="bg-emerald-600 transition-all border-l border-emerald-800" style={{width: `${wRen}%`}}></div>
                                                <div className="bg-emerald-400 transition-all border-l border-emerald-600" style={{width: `${wIsr}%`}}></div>
                                            </div>
                                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-300">
                                                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500"></span> Inflación ({inflacion}%)</div>
                                                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> PPR ({rendimientoPPR}%)</div>
                                                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> SAT ({isr}%)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col">
                                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><PiggyBank className="w-6 h-6" /></div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">Estrategia de Reinversión</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">No veas estos <strong className="text-slate-800">{formatMXN(devolucionEstimada)}</strong> como un ingreso extra para gastar hoy.<br/><br/>El secreto es la reinversión: Al inyectar esta devolución a tu PPR el siguiente año, creas un <strong>"bonche"</strong> mayor para tu ahorro, generando interés sobre interés. El SAT literalmente te está pagando para que construyas tu propio futuro.</p>
                                </div>
                                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col">
                                    <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-4"><Scale className="w-6 h-6" /></div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">Fundamento Legal (LISR)</h3>
                                    <ul className="space-y-4 text-sm text-slate-600">
                                        <li className="flex gap-3 items-start"><ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /><div><strong className="text-slate-800 block mb-1">Artículo 151, Fracción V</strong>Las aportaciones a las subcuentas de planes personales de retiro son deducibles. Límite: 10% de tus ingresos o 5 UMAs anuales.</div></li>
                                        <li className="flex gap-3 items-start"><ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /><div><strong className="text-slate-800 block mb-1">Artículo 185 (Cuentas Especiales)</strong>Complementario para estímulos fiscales en depósitos en cuentas personales especiales para el ahorro.</div></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </main>

                    {showTable && (
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden fade-in">
                                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calculator className="text-emerald-600 w-5 h-5" />Tarifa Anual ISR</h3>
                                        <p className="text-xs text-slate-500 mt-1">Busca el rango de los Ingresos Anuales para determinar el % marginal.</p>
                                    </div>
                                    <button onClick={() => setShowTable(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition"><X className="w-6 h-6" /></button>
                                </div>
                                <div className="p-0 overflow-y-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-100 text-slate-600 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-4 font-bold">Límite Inferior ($)</th>
                                                <th className="px-6 py-4 font-bold">Límite Superior ($)</th>
                                                <th className="px-6 py-4 font-bold">Cuota Fija ($)</th>
                                                <th className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50">% Marginal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-600">
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$0.01</td><td className="px-6 py-3">$8,952.49</td><td className="px-6 py-3">$0.00</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">1.92%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$8,952.50</td><td className="px-6 py-3">$75,984.55</td><td className="px-6 py-3">$171.88</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">6.40%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$75,984.56</td><td className="px-6 py-3">$133,536.07</td><td className="px-6 py-3">$4,461.94</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">10.88%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$133,536.08</td><td className="px-6 py-3">$155,229.80</td><td className="px-6 py-3">$10,723.55</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">16.00%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$155,229.81</td><td className="px-6 py-3">$185,852.57</td><td className="px-6 py-3">$14,194.54</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">17.92%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$185,852.58</td><td className="px-6 py-3">$374,837.88</td><td className="px-6 py-3">$19,682.13</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">21.36%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$374,837.89</td><td className="px-6 py-3">$590,795.99</td><td className="px-6 py-3">$60,049.40</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">23.52%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$590,796.00</td><td className="px-6 py-3">$1,127,926.84</td><td className="px-6 py-3">$110,842.74</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">30.00%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$1,127,926.85</td><td className="px-6 py-3">$1,503,902.46</td><td className="px-6 py-3">$271,981.99</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">32.00%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$1,503,902.47</td><td className="px-6 py-3">$4,511,707.37</td><td className="px-6 py-3">$392,294.17</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">34.00%</td></tr>
                                            <tr className="hover:bg-slate-50"><td className="px-6 py-3">$4,511,707.38</td><td className="px-6 py-3">En adelante</td><td className="px-6 py-3">$1,414,947.85</td><td className="px-6 py-3 font-bold text-emerald-600 bg-emerald-50/30">35.00%</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
