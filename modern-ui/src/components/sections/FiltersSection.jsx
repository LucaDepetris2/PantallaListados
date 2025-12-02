import React, { useState } from 'react';
import { Search, Globe, FileText, User, Users, Building, CreditCard, Folder } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';

const FILTER_ITEMS = [
    { id: 'zonas', label: 'Zonas', icon: Globe },
    { id: 'comprobantes', label: 'Comprobantes', icon: FileText },
    { id: 'vendedores', label: 'Vendedores', icon: User },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'sucursales', label: 'Sucursales', icon: Building },
    { id: 'condiciones', label: 'Condiciones', icon: CreditCard },
    { id: 'categorias', label: 'Categorías', icon: Folder },
];

export const FiltersSection = () => {
    const [activeModal, setActiveModal] = useState(null);
    const handleOpenModal = (id) => setActiveModal(id);
    const handleCloseModal = () => setActiveModal(null);

    return (
        <Card className="h-full flex-1 min-h-0">
            <CardHeader className="py-1.5 px-3 min-h-[32px]">
                <Search className="w-3.5 h-3.5 text-primary" />
                <h2 className="text-xs font-semibold text-slate-800">Filtros</h2>
            </CardHeader>
            <CardBody className="grid grid-cols-[1.1fr_0.9fr] gap-3 h-full overflow-hidden p-2">

                {/* Selectivos */}
                <div className="flex flex-col min-h-0">
                    <div className="grid grid-cols-2 gap-1.5 overflow-y-auto pr-1 pb-1 content-start">
                        {FILTER_ITEMS.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => handleOpenModal(id)}
                                className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded hover:border-primary hover:bg-primary-light/50 transition-all group text-left"
                            >
                                <div className="p-1 bg-slate-100 rounded-full group-hover:bg-white transition-colors shrink-0">
                                    <Icon className="w-3 h-3 text-slate-500 group-hover:text-primary" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[10px] font-semibold text-slate-700 truncate">{label}</span>
                                    <span className="text-[9px] text-primary font-medium truncate">Todas</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rangos */}
                <div className="flex flex-col min-h-0 border-l border-slate-100 pl-3">
                    <div className="space-y-1.5 overflow-y-auto pr-1 pb-1">
                        <RangeGroup label="Clientes" placeholder1="0001" placeholder2="9999" />
                        <RangeGroup label="Fechas" type="date" val1="2025-01-01" val2="2025-12-31" />
                        <RangeGroup label="Bonif. 1" type="number" val1="0" val2="100" />
                        <RangeGroup label="Bonif. 2" type="number" val1="0" val2="100" />
                        <RangeGroup label="F. Proceso" type="date" val1="2025-01-01" val2="2025-12-31" />
                        <RangeGroup label="Categorías" placeholder1="A" placeholder2="Z" />
                    </div>
                </div>

            </CardBody>

            {/* Modal Logic */}
            <Modal
                isOpen={!!activeModal}
                onClose={handleCloseModal}
                title={`Seleccionar ${FILTER_ITEMS.find(f => f.id === activeModal)?.label || ''}`}
                footer={
                    <>
                        <Button variant="ghost" onClick={handleCloseModal} className="text-xs py-1">Cancelar</Button>
                        <Button onClick={handleCloseModal} className="text-xs py-1">Confirmar</Button>
                    </>
                }
            >
                <div className="flex gap-3 h-[180px]">
                    <div className="flex-1 flex flex-col">
                        <h4 className="text-[10px] font-medium text-slate-500 mb-1">Disponibles</h4>
                        <div className="flex-1 border border-slate-200 rounded bg-slate-50"></div>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <Button variant="secondary" className="px-1.5 py-0.5 h-6 text-[10px]">›</Button>
                        <Button variant="secondary" className="px-1.5 py-0.5 h-6 text-[10px]">‹</Button>
                        <Button variant="secondary" className="px-1.5 py-0.5 h-6 text-[10px]">»</Button>
                        <Button variant="secondary" className="px-1.5 py-0.5 h-6 text-[10px]">«</Button>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h4 className="text-[10px] font-medium text-slate-500 mb-1">Seleccionados</h4>
                        <div className="flex-1 border border-slate-200 rounded bg-white"></div>
                    </div>
                </div>
                <div className="mt-3 flex gap-4">
                    <Toggle label="Guardar selección" />
                    <Toggle label="Todos los formatos" />
                </div>
            </Modal>
        </Card>
    );
};

const RangeGroup = ({ label, type = "text", placeholder1, placeholder2, val1, val2 }) => (
    <div className="flex items-center gap-2">
        <label className="w-14 text-[10px] font-semibold text-slate-500 shrink-0 truncate">{label}</label>
        <div className="flex gap-1 flex-1">
            <Input type={type} placeholder={placeholder1} defaultValue={val1} className="h-5 text-[10px] px-1 py-0" />
            <Input type={type} placeholder={placeholder2} defaultValue={val2} className="h-5 text-[10px] px-1 py-0" />
        </div>
    </div>
);
