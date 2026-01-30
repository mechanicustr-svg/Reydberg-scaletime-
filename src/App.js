import React, { useState } from 'react';
import { Microscope, Eye, Telescope, Info } from 'lucide-react';

const QuantumFilterPresentation = () => {
  const [rydbergN, setRydbergN] = useState(50);

  // Hesaplamalar
  const a0 = 0.53;
  const radius = rydbergN * rydbergN * a0;
  const scaleFactor = rydbergN * rydbergN;
  const delta_x = radius;
  const delta_p = 1 / delta_x;
  const product = delta_x * delta_p;
  
  // ZAMAN ÖLÇEKLEMESİ (Yeni eklendi!)
  const t_ground = 1; // Temel durum periyodu (referans birim)
  const t_rydberg = Math.pow(rydbergN, 3); // T ∝ n³
  const timeSlowdownFactor = t_rydberg / t_ground;
  const relativeTimeSpeed = 1 / timeSlowdownFactor; // Hız = 1/T

  // Grafik verileri (basitleştirilmiş)
  const graphPoints = [];
  for (let n = 1; n <= 100; n += 5) {
    const r = n * n * a0;
    graphPoints.push({
      n: n,
      delta_x: r,
      clarity: Math.min(100, (n / 50) * 100)
    });
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* SEO-Friendly Başlık ve Meta */}
      <div className="sr-only">
        <h1>Rydberg Atomlarında Belirsizlik İlkesinin Ölçek Bağımlılığı</h1>
        <p>Ölçek-Zaman Kuramı: Kuantum Mekaniğinin Alternatif Yorumu</p>
      </div>

      {/* Başlık */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⚛️ Rydberg Atomu: Ölçek Değiştikçe Fizik Değişir
        </h2>
        <p className="text-lg text-gray-600 italic">
          Kuantum matematiğini daha az gizemli kılan bir okuma
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Rydberg Atomlarında Belirsizlik İlkesinin Ölçek Bağımlılığı
        </p>
      </div>

      {/* Giriş Önermesi */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg mb-8 shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-green-800">
          💡 Giriş Önermesi
        </h3>
        <p className="text-gray-700 leading-relaxed mb-3 text-lg">
          Eğer bir Rydberg atomunun çapını yaklaşık <strong className="text-green-700">10,000 kat</strong> büyütebilseydik, 
          elektronun konumu ve hızı bizim için artık kuantum belirsizliğiyle değil, 
          klasik bir parçacığın değişkenleri gibi <strong className="text-green-700">ayırt edilebilir hale gelirdi</strong>.
        </p>
        <p className="text-sm text-gray-600 italic bg-white p-3 rounded">
          ⚗️ Bu bir varsayım değil - Rydberg atomları (n ≈ 100) zaten laboratuvarlarda mevcut!
        </p>
      </div>

      {/* Ana Kontrol */}
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-2xl font-bold">
              Kuantum Sayısı (n): <span className="text-blue-600">{rydbergN}</span>
            </label>
            <div className="text-right">
              <div className="text-sm text-gray-600">Büyütme Faktörü</div>
              <div className="text-3xl font-bold text-green-600">{scaleFactor.toLocaleString()}x</div>
            </div>
          </div>
          
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={rydbergN}
            onChange={(e) => setRydbergN(parseInt(e.target.value))}
            className="w-full h-4 bg-gradient-to-r from-blue-200 via-green-200 to-orange-200 rounded-lg appearance-none cursor-pointer"
            style={{
              WebkitAppearance: 'none',
              background: `linear-gradient(to right, #93c5fd 0%, #86efac 50%, #fdba74 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2 font-semibold">
            <span>n=1<br/><span className="text-xs">Normal H</span></span>
            <span>n=25<br/><span className="text-xs">Geçiş</span></span>
            <span>n=50<br/><span className="text-xs">Orta</span></span>
            <span>n=75<br/><span className="text-xs">Büyük</span></span>
            <span>n=100<br/><span className="text-xs">Rydberg!</span></span>
          </div>
        </div>

        {/* Görselleştirme Grid - Mobil Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol: Atom Görseli */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h4 className="font-bold text-center mb-4 text-lg">Atom Boyutu (Görsel)</h4>
            
            <div className="relative h-80 flex items-center justify-center bg-white rounded-lg border">
              {/* Çekirdek */}
              <div 
                className="absolute w-4 h-4 bg-red-500 rounded-full z-20 shadow-lg"
                style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}
              />
              
              {/* Yörünge */}
              <div 
                className="absolute border-4 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(300, 40 + rydbergN * 2.6)}px`,
                  height: `${Math.min(300, 40 + rydbergN * 2.6)}px`,
                  borderColor: rydbergN < 20 ? '#3b82f6' : rydbergN < 60 ? '#10b981' : '#f59e0b',
                  borderStyle: rydbergN < 30 ? 'dashed' : 'solid',
                  opacity: rydbergN < 10 ? 0.3 : 0.8,
                  boxShadow: rydbergN >= 50 ? '0 0 20px rgba(251, 146, 60, 0.5)' : 'none',
                  animation: `orbit ${Math.max(3, 15 - rydbergN / 10)}s linear infinite`
                }}
              >
                {/* Elektron - Dönen */}
                <div 
                  className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                  style={{ 
                    top: '-8px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                  }}
                />
              </div>

              {/* CSS Animation */}
              <style>{`
                @keyframes orbit {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>

              {/* Etiketler */}
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <div className="text-sm font-semibold text-gray-700">
                  r = {radius.toFixed(1)} Å
                </div>
                <div className="text-xs font-mono text-green-600 font-bold">
                  {scaleFactor.toLocaleString()}x daha büyük
                </div>
              </div>
            </div>

            {/* Durum Kartı */}
            <div className="mt-4">
              {rydbergN < 20 && (
                <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400 text-center">
                  <div className="font-bold text-blue-900 text-lg">🔬 Normal Hidrojen</div>
                  <div className="text-sm text-blue-700 mt-1">Tam kuantum davranış - elektron "bulanık"</div>
                </div>
              )}
              {rydbergN >= 20 && rydbergN < 60 && (
                <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400 text-center">
                  <div className="font-bold text-green-900 text-lg">🔄 Geçiş Bölgesi</div>
                  <div className="text-sm text-green-700 mt-1">Kuantum → Yarı-klasik dönüşüm</div>
                </div>
              )}
              {rydbergN >= 60 && (
                <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-400 text-center">
                  <div className="font-bold text-orange-900 text-lg">⚡ Rydberg Atomu!</div>
                  <div className="text-sm text-orange-700 mt-1">Klasik davranış belirginleşiyor</div>
                </div>
              )}
            </div>
          </div>

          {/* Sağ: Sayısal Değerler */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg border-2 border-blue-300 shadow-md">
              <div className="text-sm text-gray-700 mb-1 font-semibold">📏 Atom Yarıçapı</div>
              <div className="text-4xl font-bold text-blue-700">{radius.toFixed(1)} Å</div>
              <div className="text-xs text-gray-600 mt-2 font-mono">r = n² × a₀ = {rydbergN}² × {a0}</div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-300 shadow-md">
              <div className="text-sm text-gray-700 mb-1 font-semibold">🔍 Büyütme Faktörü</div>
              <div className="text-4xl font-bold text-green-700">{scaleFactor.toLocaleString()}×</div>
              <div className="text-xs text-gray-600 mt-2 font-mono">Temel duruma göre: n² = {rydbergN}²</div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-300 shadow-md">
              <div className="text-sm text-gray-700 mb-1 font-semibold">📍 Konum Belirsizliği (Δx)</div>
              <div className="text-4xl font-bold text-purple-700">{delta_x.toFixed(2)}</div>
              <div className="text-xs text-gray-600 mt-2">Yaklaşık ~ r (atom yarıçapı)</div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-5 rounded-lg border-2 border-orange-300 shadow-md">
              <div className="text-sm text-gray-700 mb-1 font-semibold">🎯 Momentum Belirsizliği (Δp)</div>
              <div className="text-4xl font-bold text-orange-700">{delta_p.toFixed(4)}</div>
              <div className="text-xs text-gray-600 mt-2">Yaklaşık ~ 1/Δx (ters orantılı)</div>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-5 rounded-lg border-4 border-yellow-500 shadow-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-800 font-bold">⚖️ Δx × Δp (Çarpım)</div>
                <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded font-mono">≥ ℏ/2 ≈ 0.5</div>
              </div>
              <div className="text-5xl font-bold text-yellow-900">{product.toFixed(4)}</div>
              <div className="text-sm text-gray-700 mt-2 font-semibold">
                {product >= 0.5 ? '✅ Belirsizlik ilkesi korunuyor!' : '⚠️ Alt limite yaklaşıldı'}
              </div>
              <div className="text-xs text-gray-600 mt-2 bg-white p-2 rounded">
                <strong>ℏ birimleri:</strong> Planck sabiti (ℏ ≈ 1.055 × 10⁻³⁴ J·s) 
                ile normalize edilmiş birimlerde Δx·Δp ≥ 0.5
              </div>
            </div>

            {/* YENİ: Zaman Ölçeklemesi Kartı */}
            <div className="bg-gradient-to-r from-indigo-100 to-violet-200 p-5 rounded-lg border-4 border-indigo-500 shadow-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-800 font-bold">⏳ Yörünge Periyodu (T)</div>
                <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded">T ∝ n³</div>
              </div>
              <div className="text-3xl font-bold text-indigo-900">
                {timeSlowdownFactor >= 1000000 
                  ? `${(timeSlowdownFactor / 1000000).toFixed(1)}M×` 
                  : timeSlowdownFactor >= 1000 
                  ? `${(timeSlowdownFactor / 1000).toFixed(1)}K×`
                  : `${timeSlowdownFactor.toFixed(0)}×`}
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <div className="font-semibold mb-1">
                  {timeSlowdownFactor > 100000 ? '🐌 Atomik saat ÇOK yavaşladı!' : 
                   timeSlowdownFactor > 1000 ? '⏱️ Zaman yavaşlıyor...' : 
                   '⚡ Normal hız'}
                </div>
                <div className="text-xs text-gray-600 bg-white p-2 rounded mt-2">
                  Temel duruma göre <strong>{timeSlowdownFactor.toLocaleString()}×</strong> daha yavaş.
                  Makro gözlemci için atom "ağır çekimde" yaşıyor!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basit Grafik */}
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h4 className="font-bold mb-6 text-xl">📊 n Değişirken Δx Nasıl Artıyor?</h4>
        
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border-2 border-gray-300">
          {/* Y ekseni */}
          <div className="absolute left-6 top-6 bottom-12 w-0.5 bg-gray-400" />
          {/* X ekseni */}
          <div className="absolute left-6 bottom-12 right-6 h-0.5 bg-gray-400" />
          
          {/* Y etiketi */}
          <div className="absolute left-0 top-1/2 -rotate-90 text-xs font-semibold text-gray-600">
            Δx (Konum Belirsizliği)
          </div>
          
          {/* X etiketi */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-600">
            Kuantum Sayısı (n)
          </div>

          {/* Grafik noktaları */}
          <svg className="absolute left-6 top-6 right-6 bottom-12" style={{ overflow: 'visible' }}>
            {graphPoints.map((point, idx) => {
              if (idx === 0) return null;
              const prevPoint = graphPoints[idx - 1];
              const x1 = ((prevPoint.n - 1) / 99) * 100;
              const y1 = 100 - ((prevPoint.delta_x / 5300) * 90);
              const x2 = ((point.n - 1) / 99) * 100;
              const y2 = 100 - ((point.delta_x / 5300) * 90);
              
              return (
                <line
                  key={idx}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
              );
            })}
            
            {/* Mevcut n işareti */}
            <line
              x1={`${((rydbergN - 1) / 99) * 100}%`}
              y1="0%"
              x2={`${((rydbergN - 1) / 99) * 100}%`}
              y2="100%"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <circle
              cx={`${((rydbergN - 1) / 99) * 100}%`}
              cy={`${100 - ((delta_x / 5300) * 90)}%`}
              r="6"
              fill="#ef4444"
            />
          </svg>

          {/* Etiketler */}
          <div className="absolute bottom-14 left-6 text-xs text-gray-600">n=1</div>
          <div className="absolute bottom-14 right-6 text-xs text-gray-600">n=100</div>
          <div className="absolute top-6 left-8 text-xs text-gray-600">Max</div>
          <div className="absolute bottom-14 left-8 text-xs text-gray-600">Min</div>
        </div>
      </div>

      {/* Temel Çıkarım */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-8 rounded-lg shadow-xl mb-8">
        <h4 className="font-bold text-2xl mb-4 text-purple-900 flex items-center gap-2">
          <Info className="w-6 h-6" />
          💡 Temel Çıkarım
        </h4>
        <div className="space-y-4 text-gray-800">
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg">
              <strong className="text-blue-700">n = 1 (Normal Hidrojen):</strong> Elektron "bulanık" ve belirsiz. 
              Tam kuantum mekaniği gerekli. Δx küçük, zaman hızlı akıyor.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
            <p className="text-lg">
              <strong className="text-green-700">n ≈ 50-100 (Rydberg):</strong> Elektron <strong>10,000 kat</strong> daha 
              büyük yörüngede. Konum ve hız "etkin olarak" ayırt edilebilir. 
              <strong className="text-indigo-700"> VE zaman {rydbergN >= 50 ? (Math.pow(rydbergN, 3) / 1000).toFixed(0) : '~'}K kat yavaşladı!</strong>
            </p>
          </div>

          {/* YENİ: Zaman Vurgusu */}
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-5 rounded-lg border-2 border-indigo-300">
            <p className="text-lg font-semibold text-indigo-900 mb-2">
              ⏰ Zaman Boyutu (Makalenin Kalbi!)
            </p>
            <p className="text-base text-gray-700">
              n arttıkça elektronun <strong>'saati'</strong> de yavaşlar (T ∝ n³). 
              Bu, makro ölçekteki bir gözlemci için, dev atomdaki süreçlerin 
              <strong> ağır çekimde yaşanıyor gibi görünmesi</strong> demektir. 
              n=100'de yörünge periyodu <strong>1 milyon kat</strong> daha uzundur!
            </p>
            <div className="mt-3 p-3 bg-white rounded border border-indigo-200">
              <p className="text-sm italic text-gray-700">
                <strong>Makalenin formülü:</strong> t' = t / k → Ölçek küçüldükçe (k&lt;1) zaman yavaşlar. 
                Rydberg'de: k = 1/n³, dolayısıyla t' = t × n³. 
                <span className="text-indigo-700 font-semibold"> Tam örtüşme!</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-lg border-2 border-orange-300 mt-4">
            <p className="text-lg italic font-semibold text-center text-gray-800">
              "Belirsizlik, elektronun ne yaptığıyla değil; bizim onu hangi ölçekte ayırt edebildiğimizle ilgilidir. 
              <br/>
              <span className="text-indigo-700">Ve zaman algımız da ölçekle birlikte değişir!</span>"
            </p>
          </div>
        </div>
      </div>

      {/* Deneysel Gerçeklik */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500 p-6 rounded-lg shadow-lg">
        <h4 className="font-bold text-lg mb-3 text-green-900">🔬 Deneysel Gerçeklik</h4>
        <p className="text-gray-700 leading-relaxed">
          Rydberg atomları (n = 50-100) laboratuvarlarda <strong>rutin olarak</strong> üretiliyor. 
          Bu bir "düşünce deneyi" değil - <strong>gerçek fizik</strong>! Ultra-soğuk atom deneyleri ve 
          kuantum hesaplama araştırmalarında aktif olarak kullanılıyorlar. 2022 Nobel Fizik Ödülü'nün 
          bir kısmı bu tür sistemlerle yapılan çalışmalara verildi.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p className="font-semibold">📚 Ölçek-Zaman Kuramı | Kuantum Filtreleme Yaklaşımı</p>
        <p className="text-xs mt-1">Grok, ChatGPT ve Gemini analizlerinden sentezlendi</p>
      </div>
    </div>
  );
};

export default QuantumFilterPresentation;
