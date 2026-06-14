// src/components/FiscaliteComparisonChart.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { FiscaliteOption } from '@/types/assuranceVie'

interface FiscaliteComparisonChartProps {
 optionPFU: FiscaliteOption
 optionIR: FiscaliteOption
 optionMoinsImposee: 'PFU' | 'IR' // Pour coloration uniquement
 montantRachat: number
}

export default function FiscaliteComparisonChart({
 optionPFU,
 optionIR,
 optionMoinsImposee,
 montantRachat
}: FiscaliteComparisonChartProps) {
 const [isVisible, setIsVisible] = useState(false)
 const chartRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
 // Animation d'entrée
 const timer = setTimeout(() => setIsVisible(true), 100)
 return () => clearTimeout(timer)
 }, [optionPFU, optionIR])

 const maxPrelevement = Math.max(optionPFU.totalPrelevement, optionIR.totalPrelevement)
 const widthPFU = (optionPFU.totalPrelevement / maxPrelevement) * 100
 const widthIR = (optionIR.totalPrelevement / maxPrelevement) * 100

 const economie = Math.abs(optionPFU.totalPrelevement - optionIR.totalPrelevement)

 return (
 <div ref={chartRef} className="space-y-6">
 {/* Titre */}
 <div className="text-center">
 <h3 className="text-2xl font-bold text-neutral-900 mb-2">
 Comparaison des options fiscales
 </h3>
 <p className="text-neutral-600">
 Sur un rachat de {montantRachat.toLocaleString('fr-FR')}€
 </p>
 </div>

 {/* Barre PFU */}
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className={`w-4 h-4 rounded-full ${
 optionMoinsImposee === 'PFU' ? 'bg-primary-500' : 'bg-neutral-400'
 }`} />
 <span className="font-bold text-lg text-neutral-900">
 {optionPFU.nom}
 </span>
 </div>
 <span className="text-2xl font-bold text-neutral-900">
 {optionPFU.totalPrelevement.toLocaleString('fr-FR')}€
 </span>
 </div>
 
 <div className="relative h-16 bg-neutral-100 rounded-lg overflow-hidden">
 <div
 className={`absolute inset-y-0 left-0 flex items-center justify-end pr-4 transition-all duration-1000 ease-out ${
 optionMoinsImposee === 'PFU' 
 ? 'bg-gradient-to-r from-primary-500 to-primary-600' 
 : 'bg-gradient-to-r from-neutral-400 to-neutral-500'
 }`}
 style={{ 
 width: isVisible ? `${widthPFU}%` : '0%'
 }}
>
 <span className="text-white font-bold text-lg">
 {optionPFU.tauxEffectif.toFixed(1)}%
 </span>
 </div>
 </div>

 <div className="text-sm text-neutral-600 space-y-1">
 <div className="flex justify-between">
 <span>Impôt sur le revenu :</span>
 <span className="font-medium">{optionPFU.impotSurRevenu.toLocaleString('fr-FR')}€</span>
 </div>
 <div className="flex justify-between">
 <span>Prélèvements sociaux (18,6%) :</span>
 <span className="font-medium">{optionPFU.prelevementsSociaux.toLocaleString('fr-FR')}€</span>
 </div>
 <div className="flex justify-between font-bold text-neutral-900 pt-2 border-t">
 <span>Net perçu :</span>
 <span className="text-primary-600">{optionPFU.netPercu.toLocaleString('fr-FR')}€</span>
 </div>
 </div>
 </div>

 {/* Barre IR */}
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className={`w-4 h-4 rounded-full ${
 optionMoinsImposee === 'IR' ? 'bg-primary-500' : 'bg-neutral-400'
 }`} />
 <span className="font-bold text-lg text-neutral-900">
 {optionIR.nom}
 </span>
 </div>
 <span className="text-2xl font-bold text-neutral-900">
 {optionIR.totalPrelevement.toLocaleString('fr-FR')}€
 </span>
 </div>
 
 <div className="relative h-16 bg-neutral-100 rounded-lg overflow-hidden">
 <div
 className={`absolute inset-y-0 left-0 flex items-center justify-end pr-4 transition-all duration-1000 ease-out ${
 optionMoinsImposee === 'IR' 
 ? 'bg-gradient-to-r from-primary-500 to-primary-600' 
 : 'bg-gradient-to-r from-neutral-400 to-neutral-500'
 }`}
 style={{ 
 width: isVisible ? `${widthIR}%` : '0%',
 transitionDelay: '100ms'
 }}
>
 <span className="text-white font-bold text-lg">
 {optionIR.tauxEffectif.toFixed(1)}%
 </span>
 </div>
 </div>

 <div className="text-sm text-neutral-600 space-y-1">
 <div className="flex justify-between">
 <span>Impôt sur le revenu :</span>
 <span className="font-medium">{optionIR.impotSurRevenu.toLocaleString('fr-FR')}€</span>
 </div>
 <div className="flex justify-between">
 <span>Prélèvements sociaux (18,6%) :</span>
 <span className="font-medium">{optionIR.prelevementsSociaux.toLocaleString('fr-FR')}€</span>
 </div>
 <div className="flex justify-between font-bold text-neutral-900 pt-2 border-t">
 <span>Net perçu :</span>
 <span className="text-primary-600">{optionIR.netPercu.toLocaleString('fr-FR')}€</span>
 </div>
 </div>
 </div>

 {/* Différence */}
 {economie> 50 && (
 <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6 text-center">
 <div className="text-sm font-medium text-primary-700 mb-2">
 Différence entre les deux options
 </div>
 <div className="text-4xl font-bold text-primary-600">
 {economie.toLocaleString('fr-FR')}€
 </div>
 <p className="text-xs text-primary-600 mt-2">
 Le choix de l&apos;option vous appartient
 </p>
 </div>
 )}
 </div>
 )
}
