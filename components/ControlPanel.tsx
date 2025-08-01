import React from 'react';
import { CardData, Template, FontFamily } from '../types';

interface ControlPanelProps {
  data: CardData;
  onUpdate: <K extends keyof CardData>(key: K, value: CardData[K]) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  onToggleQr: () => void;
}

const InputField = ({ label, id, ...props }: { label: string, id: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
        <label htmlFor={id} className="sr-only">{label}</label>
        <input id={id} {...props} placeholder={label} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#993399] transition placeholder:text-gray-400" />
    </div>
);

const SelectField = ({ label, id, children, ...props }: { label: string, id: string, children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select id={id} {...props} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#993399] transition">
            {children}
        </select>
    </div>
);

const ColorField = ({ label, id, ...props }: { label: string, id: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input id={id} {...props} type="color" className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm cursor-pointer" />
    </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({ data, onUpdate, onImageUpload, onDownload, onToggleQr }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-[400px] flex-shrink-0 bg-[#2a2a28] text-gray-200 p-6 rounded-2xl shadow-lg h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Personalizar Tarjeta</h2>
        </div>

        <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Información de Contacto</h3>
            <InputField label="Nombre Completo" id="fullName" value={data.fullName} onChange={(e) => onUpdate('fullName', e.target.value)} />
            <InputField label="Cargo o Puesto" id="title" value={data.title} onChange={(e) => onUpdate('title', e.target.value)} />
            <InputField label="Nombre de la Empresa" id="company" value={data.company} onChange={(e) => onUpdate('company', e.target.value)} />
            <InputField label="Número de Teléfono" id="phone" type="tel" value={data.phone} onChange={(e) => onUpdate('phone', e.target.value)} />
            <InputField label="Correo Electrónico" id="email" type="email" value={data.email} onChange={(e) => onUpdate('email', e.target.value)} />
            <InputField label="Sitio Web" id="website" type="url" value={data.website} onChange={(e) => onUpdate('website', e.target.value)} />
            
            <div>
              <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-300 mb-1">Logo o Foto</label>
              <input id="logo-upload" type="file" accept="image/*" onChange={onImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#993399]/50 file:text-pink-200 hover:file:bg-[#993399]/70 transition-colors" />
            </div>

            <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2 pt-4">Diseño y Estilo</h3>
            
            <SelectField label="Plantilla" id="template" value={data.template} onChange={(e) => onUpdate('template', e.target.value as Template)}>
                {Object.values(Template).map(t => <option key={t} value={t}>{t}</option>)}
            </SelectField>

            <SelectField label="Tipografía" id="fontFamily" value={data.fontFamily} onChange={(e) => onUpdate('fontFamily', e.target.value as FontFamily)}>
                {Object.values(FontFamily).map(f => <option key={f} value={f}>{f}</option>)}
            </SelectField>

            <div className="grid grid-cols-2 gap-4">
              <ColorField label="Color de Fondo" id="backgroundColor" value={data.backgroundColor} onChange={(e) => onUpdate('backgroundColor', e.target.value)} />
              <ColorField label="Color de Texto" id="textColor" value={data.textColor} onChange={(e) => onUpdate('textColor', e.target.value)} />
            </div>

            <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2 pt-4">Acciones</h3>
            <div className="flex flex-col space-y-3">
              <button onClick={onToggleQr} className="w-full py-2 px-4 rounded-md font-semibold text-white bg-[#993399] hover:bg-[#862d86] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#993399] transition-transform transform hover:scale-105">
                  {data.showQrCode ? 'Quitar QR' : 'Integrar QR'}
              </button>
              <button onClick={onDownload} className="w-full py-2 px-4 rounded-md font-semibold text-white bg-[#3645a9] hover:bg-[#2d378a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#3645a9] transition-transform transform hover:scale-105">
                  Guardar como PNG
              </button>
            </div>
        </div>
    </div>
  );
};