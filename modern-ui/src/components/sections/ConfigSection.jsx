import React from 'react';
import { Settings } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Toggle } from '../ui/Toggle';

export const ConfigSection = () => {
    return (
        <Card className="h-full">
            <CardHeader className="py-1.5 px-3 min-h-[32px]">
                <Settings className="w-3.5 h-3.5 text-primary" />
                <h2 className="text-xs font-semibold text-slate-800">Configuración</h2>
            </CardHeader>
            <CardBody className="grid grid-cols-2 gap-3 p-2">
                {/* Formato Column */}
                <div className="space-y-1.5">
                    <h3 className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Formato</h3>

                    <div className="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label className="text-[10px] font-medium text-slate-600">Título</label>
                        <Select className="h-6 text-[10px] py-0">
                            <option value="fc-rto-nc-nd">LISTADOS FC - RTO - N/C - N/D</option>
                            <option value="fc-rto-nc">LISTADOS FC - RTO - N/C</option>
                            <option value="fc-nc-nd">LISTADOS FC - N/C - N/D</option>
                        </Select>
                    </div>

                    <div className="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label className="text-[10px] font-medium text-slate-600">Orden</label>
                        <Select className="h-6 text-[10px] py-0">
                            <option value="razon-social">Razón Social</option>
                            <option value="fecha">Fecha</option>
                            <option value="numero">Número</option>
                        </Select>
                    </div>

                    <div className="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label className="text-[10px] font-medium text-slate-600">Formato</label>
                        <Input type="number" min="1" max="5" defaultValue="1" className="h-6 text-[10px] py-0" />
                    </div>
                </div>

                {/* Datos Column */}
                <div className="space-y-1.5">
                    <h3 className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Opciones</h3>

                    <div className="bg-slate-50 px-2 py-1 rounded border border-slate-100 flex gap-4">
                        <Toggle label="Solo anulados" />
                        <Toggle label="Cot. histórica" checked={true} onChange={() => { }} />
                    </div>

                    <div className="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label className="text-[10px] font-medium text-slate-600">Moneda</label>
                        <Select className="h-6 text-[10px] py-0">
                            <option value="pesos">Pesos ($)</option>
                            <option value="dolares">Dólares (US$)</option>
                            <option value="euros">Euros (€)</option>
                        </Select>
                    </div>

                    <div className="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label className="text-[10px] font-medium text-slate-600">Pendientes</label>
                        <Select className="h-6 text-[10px] py-0">
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </Select>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
