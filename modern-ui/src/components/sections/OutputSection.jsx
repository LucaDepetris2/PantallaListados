import React from 'react';
import { Printer, Monitor, Package } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';

export const OutputSection = () => {
    return (
        <Card className="shrink-0">
            <CardBody className="flex items-center justify-between gap-3 py-2 px-3">

                {/* Printer Config */}
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-56 space-y-0.5">
                        <label className="text-[10px] font-medium text-slate-700">Impresora</label>
                        <Select className="h-7 text-[10px] py-0">
                            <option value="microsoft-print">Microsoft Print to PDF</option>
                            <option value="hp-laserjet">HP LaserJet Pro</option>
                        </Select>
                    </div>

                    <div className="w-16 space-y-0.5">
                        <label className="text-[10px] font-medium text-slate-700">Copias</label>
                        <Input type="number" min="1" defaultValue="1" className="h-7 text-[10px] py-0" />
                    </div>

                    <div className="flex flex-col gap-0.5 pt-3 pl-2">
                        <Toggle label="Sep. miles" checked={true} onChange={() => { }} />
                        <Toggle label="Email" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="text-[10px] h-7 px-2">
                        <Monitor className="w-3 h-3" />
                        Vista Previa
                    </Button>
                    <Button variant="primary" className="text-[10px] h-7 px-2">
                        <Printer className="w-3 h-3" />
                        Imprimir
                    </Button>
                    <Button variant="outline" className="text-[10px] h-7 px-2">
                        <Package className="w-3 h-3" />
                        Instalar
                    </Button>
                </div>

            </CardBody>
        </Card>
    );
};
