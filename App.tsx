import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { CardData, Template, FontFamily } from './types';
import { ControlPanel } from './components/ControlPanel';
import { BusinessCardPreview } from './components/BusinessCardPreview';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
    const [cardData, setCardData] = useState<CardData>({
        fullName: '',
        title: '',
        company: '',
        phone: '',
        email: '',
        website: '',
        logo: null,
        template: Template.Modern,
        fontFamily: FontFamily.NotoSans,
        backgroundColor: '#3645a9',
        textColor: '#ffffff',
        showQrCode: false,
    });
    
    const cardPreviewRef = useRef<HTMLDivElement>(null);

    const updateCardData = useCallback(<K extends keyof CardData>(key: K, value: CardData[K]) => {
        setCardData(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (cardData.logo) {
                URL.revokeObjectURL(cardData.logo);
            }
            updateCardData('logo', URL.createObjectURL(file));
        }
    }, [cardData.logo, updateCardData]);

    const handleDownloadImage = useCallback(() => {
        if (cardPreviewRef.current) {
            html2canvas(cardPreviewRef.current, { 
                useCORS: true, 
                backgroundColor: null,
                scale: 3 // Higher scale for better quality
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `tarjeta-${cardData.fullName.toLowerCase().replace(/\s+/g, '-') || 'tarjeta'}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    }, [cardData.fullName]);

    const handleToggleQr = useCallback(() => {
        updateCardData('showQrCode', !cardData.showQrCode);
    }, [cardData.showQrCode, updateCardData]);

    const vCardString = useMemo(() => {
        const [firstName, ...lastNameParts] = cardData.fullName.split(' ');
        const lastName = lastNameParts.join(' ');
        return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${cardData.fullName}
ORG:${cardData.company}
TITLE:${cardData.title}
TEL;TYPE=WORK,VOICE:${cardData.phone}
EMAIL:${cardData.email}
URL:${cardData.website}
END:VCARD`;
    }, [cardData.fullName, cardData.company, cardData.title, cardData.phone, cardData.email, cardData.website]);

    const getContrastColor = useCallback((hex: string): string => {
        if (!hex || hex.length < 7) return '#000000';
        try {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return (yiq >= 128) ? '#000000' : '#FFFFFF';
        } catch (e) {
            return '#000000';
        }
    }, []);
    
    const contrastColor = useMemo(() => {
        const bgColor = cardData.backgroundColor;
        const textColor = cardData.textColor;
        const avgHex = '#' + [1, 3, 5].map(i => {
            const h1 = parseInt(bgColor.slice(i, i + 2), 16);
            const h2 = parseInt(textColor.slice(i, i + 2), 16);
            return Math.round((h1 + h2) / 2).toString(16).padStart(2, '0');
        }).join('');
        return getContrastColor(avgHex);
    }, [cardData.backgroundColor, cardData.textColor, getContrastColor]);

    useEffect(() => {
        // Cleanup object URL on component unmount
        const logoUrl = cardData.logo;
        return () => {
            if (logoUrl) {
                URL.revokeObjectURL(logoUrl);
            }
        };
    }, [cardData.logo]);

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row items-center md:items-start p-4 lg:p-8 gap-8 bg-[#1d1d1b]">
            <ControlPanel 
                data={cardData}
                onUpdate={updateCardData}
                onImageUpload={handleImageUpload}
                onDownload={handleDownloadImage}
                onToggleQr={handleToggleQr}
            />
            <div className="flex-1 flex items-center justify-center w-full md:h-screen md:sticky top-0 py-8">
                <BusinessCardPreview 
                    ref={cardPreviewRef}
                    data={cardData}
                    vCardString={vCardString}
                    contrastColor={contrastColor}
                />
            </div>
        </main>
    );
};

export default App;