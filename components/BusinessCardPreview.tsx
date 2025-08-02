import React, { forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { CardData, Template, FontFamily } from '../types';
import { PhoneIcon, MailIcon, GlobeIcon, BuildingIcon } from './icons';

interface BusinessCardPreviewProps {
  data: CardData;
  vCardString: string;
  contrastColor: string;
}

const fontClassMap: Record<string, string> = {
  [FontFamily.Roboto]: 'font-roboto',
  [FontFamily.Lato]: 'font-lato',
  [FontFamily.Montserrat]: 'font-montserrat',
  [FontFamily.Poppins]: 'font-poppins',
  [FontFamily.Merriweather]: 'font-merriweather',
  [FontFamily.PlayfairDisplay]: 'font-playfair-display',
  [FontFamily.NotoSans]: 'font-noto-sans',
};

const InfoLine = ({ icon, text, reversed = false }: { icon: React.ReactNode, text: string, reversed?: boolean }) => (
    text ? <div className={`flex items-center gap-2 ${reversed ? 'justify-end' : ''}`}>
        {reversed || icon}
        <span className="text-sm break-all">{text}</span>
        {reversed && icon}
    </div> : null
);

const renderTemplate = (data: CardData, vCardString: string, contrastColor: string) => {
    const isGradient = [
        Template.GradientWave, 
        Template.Sunset, 
        Template.Aurora, 
        Template.CristalEsmerilado,
        Template.CapasTranslucidas,
    ].includes(data.template);
    
    const finalTextColor = data.template === Template.FotoFondo ? '#FFFFFF' : (isGradient ? contrastColor : data.textColor);
    
    const finalBgStyle = {
        [Template.GradientWave]: { background: `linear-gradient(75deg, ${data.backgroundColor}, ${data.textColor})` },
        [Template.Sunset]: { background: `linear-gradient(to bottom, ${data.backgroundColor}, ${data.textColor})` },
        [Template.Aurora]: { background: `linear-gradient(195deg, ${data.backgroundColor}, ${data.textColor})` },
        [Template.CristalEsmerilado]: { background: `linear-gradient(45deg, ${data.backgroundColor}, ${data.textColor})` },
        [Template.CapasTranslucidas]: { background: `linear-gradient(135deg, ${data.backgroundColor}, ${data.textColor})` },
    }[data.template] || { backgroundColor: data.backgroundColor };

    const fotoFondoStyle = data.template === Template.FotoFondo && data.logo 
        ? { backgroundImage: `url(${data.logo})` } 
        : { backgroundColor: data.backgroundColor };

    const style = data.template === Template.FotoFondo ? { ...fotoFondoStyle, color: finalTextColor } : { ...finalBgStyle, color: finalTextColor };

    const qrCodeComponent = data.showQrCode && (
        <div className="bg-white p-1 rounded-md shadow-md w-[5em] h-[5em]">
            <QRCodeCanvas 
                value={vCardString} 
                level="M"
                size={128}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
        </div>
    );
    
    const logoComponent = data.logo && (
        <img src={data.logo} alt="logo" className="w-16 h-16 object-contain" />
    );

    switch (data.template) {
        case Template.Modern:
            return (
                <div style={style} className="w-full h-full flex p-6">
                    <div className="w-1/3 flex flex-col justify-center items-center space-y-4 pr-4 border-r" style={{borderColor: finalTextColor+'80'}}>
                        {logoComponent || <BuildingIcon className="w-16 h-16"/>}
                        {qrCodeComponent}
                    </div>
                    <div className="w-2/3 flex flex-col justify-center pl-6">
                        <h2 className="text-2xl font-bold">{data.fullName}</h2>
                        <p className="text-md font-light" style={{color: finalTextColor+'B3'}}>{data.title}</p>
                        <p className="text-lg font-semibold mt-2">{data.company}</p>
                        <div className="mt-4 space-y-2 text-xs">
                            <InfoLine icon={<PhoneIcon className="w-4 h-4" />} text={data.phone} />
                            <InfoLine icon={<MailIcon className="w-4 h-4" />} text={data.email} />
                            <InfoLine icon={<GlobeIcon className="w-4 h-4" />} text={data.website} />
                        </div>
                    </div>
                </div>
            );
        case Template.Minimalist:
            return (
                <div style={style} className="w-full h-full flex flex-col justify-between p-6">
                    <div>
                        <h2 className="text-3xl font-light tracking-widest">{data.fullName}</h2>
                        <p className="text-md font-extralight tracking-[0.2em] uppercase" style={{color: finalTextColor+'B3'}}>{data.title}</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="text-xs space-y-2">
                             <p className="font-semibold">{data.company}</p>
                             <p>{data.phone}</p>
                             <p>{data.email}</p>
                             <p>{data.website}</p>
                        </div>
                        <div className="flex items-end gap-2">
                          {logoComponent}
                          {qrCodeComponent}
                        </div>
                    </div>
                </div>
            );
        case Template.FotoFondo:
            return (
                <div style={style} className="w-full h-full p-6 flex flex-col justify-between relative bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 w-full">
                        <p className="font-semibold text-lg">{data.company}</p>
                    </div>
                    <div className="relative z-10 w-full text-right">
                        <h2 className="text-3xl font-bold">{data.fullName}</h2>
                        <p className="text-lg font-light" style={{color: finalTextColor+'B3'}}>{data.title}</p>
                        <div className="border-t w-full my-3" style={{borderColor: finalTextColor+'80'}}></div>
                        <div className="space-y-1.5 text-sm flex flex-col items-end">
                            <InfoLine reversed icon={<PhoneIcon className="w-4 h-4" />} text={data.phone} />
                            <InfoLine reversed icon={<MailIcon className="w-4 h-4" />} text={data.email} />
                            <InfoLine reversed icon={<GlobeIcon className="w-4 h-4" />} text={data.website} />
                        </div>
                    </div>
                    {data.showQrCode && <div className="absolute bottom-6 left-6 z-10">{qrCodeComponent}</div>}
                </div>
            );
        case Template.CristalEsmerilado:
            return (
                 <div style={style} className="w-full h-full p-6 flex items-center justify-center">
                    <div className="w-full h-full flex flex-col justify-between bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
                         <div>
                            <h2 className="text-3xl font-bold">{data.fullName}</h2>
                            <p className="text-md" style={{color: finalTextColor+'B3'}}>{data.title}</p>
                            <p className="text-lg font-semibold mt-1">{data.company}</p>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="space-y-1.5 text-sm">
                                <InfoLine icon={<PhoneIcon className="w-4 h-4" />} text={data.phone} />
                                <InfoLine icon={<MailIcon className="w-4 h-4" />} text={data.email} />
                                <InfoLine icon={<GlobeIcon className="w-4 h-4" />} text={data.website} />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                               {logoComponent}
                               {qrCodeComponent}
                            </div>
                        </div>
                    </div>
                 </div>
            );
        case Template.CapasTranslucidas:
            return (
                <div style={style} className="w-full h-full flex">
                    <div className="w-1/3 flex flex-col justify-center items-center p-4 bg-black/10 backdrop-blur-sm border-r" style={{borderColor: finalTextColor+'30'}}>
                        <div className="space-y-4 flex flex-col items-center">
                          {logoComponent || <BuildingIcon className="w-20 h-20"/>}
                          {qrCodeComponent}
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col justify-center p-6">
                        <h2 className="text-3xl font-bold">{data.fullName}</h2>
                        <p className="text-lg font-light" style={{color: finalTextColor+'B3'}}>{data.title}</p>
                        <p className="text-xl font-semibold mt-4">{data.company}</p>
                        <div className="border-t w-full my-4" style={{borderColor: finalTextColor+'80'}}></div>
                        <div className="space-y-2 text-sm">
                            <InfoLine icon={<PhoneIcon className="w-4 h-4" />} text={data.phone} />
                            <InfoLine icon={<MailIcon className="w-4 h-4" />} text={data.email} />
                            <InfoLine icon={<GlobeIcon className="w-4 h-4" />} text={data.website} />
                        </div>
                    </div>
                </div>
            );
        case Template.GradientWave:
        case Template.Sunset:
        case Template.Aurora:
             return (
                <div style={style} className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center space-y-4">
                        {logoComponent}
                        <h2 className="text-3xl font-bold">{data.fullName}</h2>
                        <p className="text-lg" style={{color: finalTextColor+'B3'}}>{data.title}</p>
                        <div className="w-24 h-px mx-auto" style={{backgroundColor: finalTextColor+'80'}}></div>
                        <div className="flex justify-center items-center gap-4 pt-2">
                            <div className="text-left text-sm space-y-1">
                                <p>{data.phone}</p>
                                <p>{data.email}</p>
                                <p>{data.website}</p>
                            </div>
                            {qrCodeComponent}
                        </div>
                    </div>
                </div>
            );
        case Template.Classic:
        default:
            return (
                <div style={style} className="w-full h-full flex flex-col justify-center p-6">
                    <div className="flex items-center gap-4 mb-4">
                       {logoComponent}
                       <div>
                         <h2 className="text-2xl font-bold">{data.fullName}</h2>
                         <p className="text-md" style={{color: finalTextColor+'B3'}}>{data.title}</p>
                       </div>
                    </div>
                    <div className="border-t w-full my-4" style={{borderColor: finalTextColor+'80'}}></div>
                    <div className="flex justify-between items-end">
                        <div className="space-y-1.5">
                            <InfoLine icon={<BuildingIcon className="w-4 h-4" />} text={data.company} />
                            <InfoLine icon={<PhoneIcon className="w-4 h-4" />} text={data.phone} />
                            <InfoLine icon={<MailIcon className="w-4 h-4" />} text={data.email} />
                            <InfoLine icon={<GlobeIcon className="w-4 h-4" />} text={data.website} />
                        </div>
                        {qrCodeComponent}
                    </div>
                </div>
            );
    }
}

export const BusinessCardPreview = forwardRef<HTMLDivElement, BusinessCardPreviewProps>(({ data, vCardString, contrastColor }, ref) => {
    const fontClass = fontClassMap[data.fontFamily] || 'font-noto-sans';

    return (
        <div 
            ref={ref} 
            style={{ fontSize: 'clamp(10px, 3vw, 16px)' }}
            className={`w-full max-w-[530px] aspect-[1.77] rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-3xl ${fontClass}`}>
            {renderTemplate(data, vCardString, contrastColor)}
        </div>
    );
});