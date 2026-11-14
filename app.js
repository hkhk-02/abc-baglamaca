  (function () {
    'use strict';

    const GRADES = [
      { grade: 0, label: 'Çok Kolay', levels: [
        { level: 1, size: 3, pairs: 2 },
        { level: 2, size: 3, pairs: 2 },
        { level: 3, size: 4, pairs: 4 },
        { level: 4, size: 4, pairs: 3 },
        { level: 5, size: 4, pairs: 2 }
      ]},
      { grade: 1, label: 'Kolay', levels: [
        { level: 1, size: 4, pairs: 3 },
        { level: 2, size: 4, pairs: 2 },
        { level: 3, size: 5, pairs: 5 },
        { level: 4, size: 5, pairs: 4 },
        { level: 5, size: 5, pairs: 3 }
      ]},
      { grade: 2, label: 'Orta', levels: [
        { level: 1, size: 6, pairs: 6 },
        { level: 2, size: 6, pairs: 5 },
        { level: 3, size: 6, pairs: 4 },
        { level: 4, size: 7, pairs: 7 },
        { level: 5, size: 7, pairs: 6 }
      ]},
      { grade: 3, label: 'Zor', levels: [
        { level: 1, size: 7, pairs: 5 },
        { level: 2, size: 7, pairs: 4 },
        { level: 3, size: 8, pairs: 8 },
        { level: 4, size: 8, pairs: 7 },
        { level: 5, size: 8, pairs: 6 }
      ]},
      { grade: 4, label: 'Çok Zor', levels: [
        { level: 1, size: 8, pairs: 5 },
        { level: 2, size: 9, pairs: 8 },
        { level: 3, size: 9, pairs: 7 },
        { level: 4, size: 9, pairs: 6 },
        { level: 5, size: 9, pairs: 5 }
      ]},
      { grade: 5, label: 'Uzman', levels: [
        { level: 1, size: 9, pairs: 4 },
        { level: 2, size: 10, pairs: 9 },
        { level: 3, size: 10, pairs: 8 },
        { level: 4, size: 10, pairs: 7 },
        { level: 5, size: 10, pairs: 6 }
      ]}
    ];

    const MAX_SIZE = 10;
    const LETTERS = 'ABCDEFGHI';
    const PATH_COLORS = {
      A: '#e65100', B: '#f9a825', C: '#1565c0', D: '#2e7d32',
      E: '#8e24aa', F: '#00838f', G: '#d81b60', H: '#5d4037', I: '#3949ab'
    };
    const PATH_DASHES = {
      A: '', B: '10,6', C: '3,6', D: '12,5,3,5',
      E: '6,5', F: '14,5,3,5,3,5', G: '4,4', H: '9,4,2,4', I: '15,4,2,4,2,4'
    };
    const SYMBOL_THEMES = [
      { id: 'letters', name: 'Harf', icon: '🔤', desc: 'Klasik A-B-C', map: { A:'A', B:'B', C:'C', D:'D', E:'E', F:'F', G:'G', H:'H', I:'I' } },
      { id: 'animals', name: 'Hayvan', icon: '🐾', desc: 'Sevimli Dostlar', map: { A:'🐶', B:'🐱', C:'🐰', D:'🦊', E:'🐼', F:'🐸', G:'🦁', H:'🐨', I:'🐯' } },
      { id: 'fruits',  name: 'Meyve',  icon: '🍎', desc: 'Taze Meyveler', map: { A:'🍎', B:'🍌', C:'🍓', D:'🍇', E:'🍉', F:'🍒', G:'🍍', H:'🥝', I:'🍑' } },
      { id: 'space',   name: 'Uzay',   icon: '🚀', desc: 'Gezegen Keşfi', map: { A:'🚀', B:'🪐', C:'⭐', D:'🛸', E:'🌍', F:'☄️', G:'🌙', H:'🛰️', I:'🔭' } },
      { id: 'numbers', name: 'Sayı',   icon: '🔢', desc: '1-2-3 Rakamlar', map: { A:'1', B:'2', C:'3', D:'4', E:'5', F:'6', G:'7', H:'8', I:'9' } },
      {
        id: 'antonyms',
        name: 'Zıt Anlam',
        icon: '🔄',
        desc: 'Türkçe (1.–4. Sınıf)',
        sample: 'Az ↔ Çok',
        isEdu: true,
        usesGrade: true,
        map: { A:'A', B:'B', C:'C', D:'D', E:'E', F:'F', G:'G', H:'H', I:'I' },
        pairsByGrade: {
          1: [
            ['Az', 'Çok'], ['Aç', 'Tok'], ['Var', 'Yok'], ['Gel', 'Git'],
            ['İyi', 'Kötü'], ['Büyük', 'Küçük'], ['Uzun', 'Kısa'], ['Sıcak', 'Soğuk'],
            ['Gece', 'Gündüz'], ['Alt', 'Üst'], ['Ön', 'Arka'], ['İç', 'Dış'],
            ['Dolu', 'Boş'], ['Yeni', 'Eski'], ['Açık', 'Kapalı'], ['Hızlı', 'Yavaş'],
            ['Temiz', 'Kirli'], ['Tatlı', 'Acı']
          ],
          2: [
            ['Ak', 'Kara'], ['Dar', 'Geniş'], ['Yaz', 'Kış'], ['Ağır', 'Hafif'],
            ['Sert', 'Yumuşak'], ['Yaşlı', 'Genç'], ['İnce', 'Kalın'], ['Uzak', 'Yakın'],
            ['Güzel', 'Çirkin'], ['Doğru', 'Yanlış'], ['İlk', 'Son'], ['Sağ', 'Sol'],
            ['Aşağı', 'Yukarı'], ['Erken', 'Geç'], ['Kolay', 'Zor'], ['Mutlu', 'Üzgün'],
            ['Kuru', 'Islak'], ['Şişman', 'Zayıf']
          ],
          3: [
            ['Zengin', 'Fakir'], ['Cömert', 'Cimri'], ['Cesur', 'Korkak'], ['Taze', 'Bayat'],
            ['Çalışkan', 'Tembel'], ['Savaş', 'Barış'], ['Dost', 'Düşman'], ['Kâr', 'Zarar'],
            ['Ucuz', 'Pahalı'], ['Aydınlık', 'Karanlık'], ['Gürültü', 'Sessiz'], ['Sık', 'Seyrek'],
            ['Düz', 'Eğri'], ['İleri', 'Geri'], ['Tavan', 'Taban'], ['Sor', 'Cevapla'],
            ['Ağla', 'Gül'], ['Al', 'Ver']
          ],
          4: [
            ['Ödül', 'Ceza'], ['Neden', 'Sonuç'], ['Gerçek', 'Hayal'], ['Somut', 'Soyut'],
            ['Tekil', 'Çoğul'], ['Üretici', 'Tüketici'], ['İthalat', 'İhracat'], ['Yapay', 'Doğal'],
            ['Birey', 'Toplum'], ['Yerli', 'Yabancı'], ['Yüksek', 'Alçak'], ['Derin', 'Sığ'],
            ['Saydam', 'Opak'], ['Bolluk', 'Kıtlık'], ['Geçmiş', 'Gelecek'], ['Başla', 'Bitir'],
            ['Artı', 'Eksi'], ['Galip', 'Mağlup']
          ]
        }
      },
      {
        id: 'synonyms',
        name: 'Eş Anlam',
        icon: '🟰',
        desc: 'Türkçe (1.–4. Sınıf)',
        sample: 'Al ↔ Kırmızı',
        isEdu: true,
        usesGrade: true,
        map: { A:'A', B:'B', C:'C', D:'D', E:'E', F:'F', G:'G', H:'H', I:'I' },
        pairsByGrade: {
          1: [
            ['Al', 'Kırmızı'], ['Ak', 'Beyaz'], ['Kara', 'Siyah'], ['Ad', 'İsim'],
            ['Ev', 'Konut'], ['Okul', 'Mektep'], ['Sene', 'Yıl'], ['Ses', 'Seda'],
            ['Düş', 'Rüya'], ['Yaşlı', 'İhtiyar'], ['Hekim', 'Doktor'], ['Yurt', 'Vatan'],
            ['Kafa', 'Baş'], ['Yüz', 'Surat'], ['Elbise', 'Giysi'], ['Pabuç', 'Ayakkabı']
          ],
          2: [
            ['Yanıt', 'Cevap'], ['Soru', 'Sual'], ['Sözcük', 'Kelime'], ['Öykü', 'Hikaye'],
            ['Konuk', 'Misafir'], ['Armağan', 'Hediye'], ['Uzak', 'Irak'], ['Hızlı', 'Çabuk'],
            ['Güç', 'Kuvvet'], ['Kıyı', 'Sahil'], ['Doğa', 'Tabiat'], ['Anı', 'Hatıra'],
            ['Büyük', 'İri'], ['Küçük', 'Ufak'], ['Öğrenci', 'Talebe'], ['Öğretmen', 'Muallim']
          ],
          3: [
            ['Sınav', 'İmtihan'], ['Duygu', 'His'], ['Kalp', 'Yürek'], ['Akıl', 'Us'],
            ['Zaman', 'Vakit'], ['Güz', 'Sonbahar'], ['Özlem', 'Hasret'], ['Öneri', 'Teklif'],
            ['Görev', 'Vazife'], ['Yarar', 'Fayda'], ['Zarar', 'Ziyan'], ['Fakir', 'Yoksul'],
            ['Zengin', 'Varlıklı'], ['Cesur', 'Yiğit'], ['Şehir', 'Kent'], ['Dünya', 'Cihan']
          ],
          4: [
            ['Neden', 'Sebep'], ['Sonuç', 'Netice'], ['Önemli', 'Mühim'], ['Olay', 'Hadise'],
            ['Kanıt', 'Delil'], ['Özgür', 'Hür'], ['Millet', 'Ulus'], ['Bayrak', 'Sancak'],
            ['Barış', 'Sulh'], ['Savaş', 'Harp'], ['Eser', 'Yapıt'], ['İlave', 'Ek'],
            ['Uyarı', 'İkaz'], ['Tedbir', 'Önlem'], ['Birey', 'Fert'], ['Toplum', 'Cemiyet'],
            ['Doğu', 'Şark'], ['Batı', 'Garp']
          ]
        }
      },
      {
        id: 'math',
        name: 'İşlem-Sonuç',
        icon: '➕',
        desc: 'Dört İşlem (1.–4. Sınıf)',
        sample: '3+4 ↔ 7',
        isEdu: true,
        isMath: true,
        map: { A:'A', B:'B', C:'C', D:'D', E:'E', F:'F', G:'G', H:'H', I:'I' }
      },
      {
        id: 'english',
        name: 'İngilizce',
        icon: '🇬🇧',
        desc: 'Kelime (1.–4. Sınıf)',
        sample: 'Cat ↔ Kedi',
        isEdu: true,
        usesGrade: true,
        map: { A:'A', B:'B', C:'C', D:'D', E:'E', F:'F', G:'G', H:'H', I:'I' },
        pairsByGrade: {
          1: [
            ['Cat', 'Kedi'], ['Dog', 'Köpek'], ['Red', 'Kırmızı'], ['Blue', 'Mavi'],
            ['One', 'Bir'], ['Two', 'İki'], ['Three', 'Üç'], ['Four', 'Dört'],
            ['Five', 'Beş'], ['Sun', 'Güneş'], ['Moon', 'Ay'], ['Star', 'Yıldız'],
            ['Ball', 'Top'], ['Car', 'Araba'], ['Book', 'Kitap'], ['Pen', 'Kalem'],
            ['Apple', 'Elma'], ['Milk', 'Süt'], ['Boy', 'Erkek'], ['Girl', 'Kız']
          ],
          2: [
            ['Green', 'Yeşil'], ['Pink', 'Pembe'], ['Black', 'Siyah'], ['White', 'Beyaz'],
            ['Desk', 'Sıra'], ['Bag', 'Çanta'], ['Ruler', 'Cetvel'], ['Door', 'Kapı'],
            ['Bird', 'Kuş'], ['Fish', 'Balık'], ['Duck', 'Ördek'], ['Frog', 'Kurbağa'],
            ['Eye', 'Göz'], ['Ear', 'Kulak'], ['Nose', 'Burun'], ['Hand', 'El'],
            ['Banana', 'Muz'], ['Grape', 'Üzüm'], ['Eight', 'Sekiz'], ['Ten', 'On']
          ],
          3: [
            ['Mother', 'Anne'], ['Father', 'Baba'], ['Uncle', 'Amca'], ['Aunt', 'Teyze'],
            ['Happy', 'Mutlu'], ['Sad', 'Üzgün'], ['Angry', 'Kızgın'], ['Tired', 'Yorgun'],
            ['Hungry', 'Aç'], ['Sunny', 'Güneşli'], ['Rainy', 'Yağmurlu'], ['Windy', 'Rüzgarlı'],
            ['Snowy', 'Karlı'], ['Kitchen', 'Mutfak'], ['Garden', 'Bahçe'], ['Room', 'Oda'],
            ['Table', 'Masa'], ['Chair', 'Sandalye'], ['Train', 'Tren'], ['Plane', 'Uçak']
          ],
          4: [
            ['Doctor', 'Doktor'], ['Nurse', 'Hemşire'], ['Teacher', 'Öğretmen'], ['Pilot', 'Pilot'],
            ['Chef', 'Aşçı'], ['Farmer', 'Çiftçi'], ['Monday', 'Pazartesi'], ['Sunday', 'Pazar'],
            ['Morning', 'Sabah'], ['Night', 'Gece'], ['Read', 'Okumak'], ['Write', 'Yazmak'],
            ['Swim', 'Yüzmek'], ['Run', 'Koşmak'], ['Jump', 'Zıplamak'], ['Sleep', 'Uyumak'],
            ['Math', 'Matematik'], ['Music', 'Müzik'], ['Art', 'Resim'], ['Clock', 'Saat']
          ]
        }
      }
    ];
    const ACHIEVEMENTS = [
      { id: 'first_win',  icon: '🌱', title: 'İlk Kıvılcım',    desc: 'İlk bulmacanı başarıyla çöz.' },
      { id: 'speed_15',   icon: '⚡', title: 'Hız Şimşeği',     desc: 'Bir bulmacayı 15 saniyenin altında çöz.' },
      { id: 'no_hint_10', icon: '🎯', title: 'Saf Mantık',      desc: 'İpucu kullanmadan 10 bulmaca çöz.' },
      { id: 'streak_5',   icon: '🔥', title: 'Ateşli Seri',     desc: 'Üst üste 5 bulmaca çözerek 5\'li seri yap.' },
      { id: 'obstacle_5', icon: '🧱', title: 'Engel Tanımaz',   desc: 'Engelli modda 5 bulmaca tamamla.' },
      { id: 'memory_win', icon: '🧠', title: 'Keskin Hafıza',   desc: 'Hafıza modunda bir bulmacayı tamamla.' },
      { id: 'rush_5',     icon: '⏱️', title: 'Fırtına Avcısı',  desc: '60sn Fırtına modunda tek turda 5 soru çöz.' },
      { id: 'expert_win', icon: '👑', title: 'Büyük Üstat',     desc: 'Uzman zorluk kademesinde bir bulmaca çöz.' }
    ];
    const SCALE_NOTES = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    const MIN_PATH_CELLS = 4;
    const MAX_HINTS = 2;
    const STORAGE_KEY = 'minibilge-abc-baglamaca-v4';

    /* Deterministik Rastgele Sayı Üreteci (Soru Kodu ve Günün Sorusu için) */
    let activeRng = Math.random;
    function mulberry32(seed) {
      let a = seed >>> 0;
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    function rand() { return activeRng(); }

    /* Üretim Algoritması */
    const neighborCache = {};
    function neighborsOf(size) {
      if (neighborCache[size]) return neighborCache[size];
      const nb = [];
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const list = [];
          if (r > 0) list.push((r - 1) * size + c);
          if (r < size - 1) list.push((r + 1) * size + c);
          if (c > 0) list.push(r * size + c - 1);
          if (c < size - 1) list.push(r * size + c + 1);
          nb.push(list);
        }
      }
      neighborCache[size] = nb;
      return nb;
    }

    function reverseSegment(path, pos, from, to) {
      while (from < to) {
        const a = path[from], b = path[to];
        path[from] = b; path[to] = a;
        pos[b] = from; pos[a] = to;
        from++; to--;
      }
    }

    function randomHamiltonian(size, iterations) {
      const nb = neighborsOf(size);
      const path = [];
      for (let r = 0; r < size; r++) {
        if (r % 2 === 0) for (let c = 0; c < size; c++) path.push(r * size + c);
        else for (let c = size - 1; c >= 0; c--) path.push(r * size + c);
      }
      const pos = new Array(size * size);
      path.forEach((cell, i) => { pos[cell] = i; });
      const n = path.length;

      for (let it = 0; it < iterations; it++) {
        if (rand() < 0.5) {
          const list = nb[path[0]];
          const i = pos[list[(rand() * list.length) | 0]];
          if (i > 1) reverseSegment(path, pos, 0, i - 1);
        } else {
          const list = nb[path[n - 1]];
          const i = pos[list[(rand() * list.length) | 0]];
          if (i < n - 2) reverseSegment(path, pos, i + 1, n - 1);
        }
      }
      return path;
    }

    function splitPath(path, parts, minLen) {
      const total = path.length;
      if (total < parts * minLen) return null;
      const lengths = new Array(parts).fill(minLen);
      let extra = total - parts * minLen;
      while (extra > 0) {
        lengths[(rand() * parts) | 0]++;
        extra--;
      }
      const segments = [];
      let cursor = 0;
      for (const len of lengths) {
        segments.push(path.slice(cursor, cursor + len));
        cursor += len;
      }
      return segments;
    }

    function manhattanIdx(a, b, size) {
      return Math.abs(((a / size) | 0) - ((b / size) | 0)) + Math.abs((a % size) - (b % size));
    }

    function countTurns(seg) {
      let turns = 0;
      for (let i = 2; i < seg.length; i++) {
        if (seg[i] - seg[i - 1] !== seg[i - 1] - seg[i - 2]) turns++;
      }
      return turns;
    }

    /* 2x2 Gereksiz Kıvrım (Self-Touching) Sayacı */
    function countSelfTouches(seg, size) {
      let touches = 0;
      for (let i = 0; i < seg.length; i++) {
        for (let j = i + 2; j < seg.length; j++) {
          if (manhattanIdx(seg[i], seg[j], size) === 1) touches++;
        }
      }
      return touches;
    }

    /* 2x2 Paralel Kenar Değişimi (Ambiguous 2x2 Swap) Analizörü */
    function count2x2Swaps(segments, size) {
      const edgeOwner = new Map();
      const edgeKey = (u, v) => (u < v ? `${u}-${v}` : `${v}-${u}`);
      for (let sIdx = 0; sIdx < segments.length; sIdx++) {
        const seg = segments[sIdx];
        for (let i = 0; i < seg.length - 1; i++) {
          edgeOwner.set(edgeKey(seg[i], seg[i + 1]), sIdx);
        }
      }
      let intra = 0;
      let inter = 0;
      for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size - 1; c++) {
          const tl = r * size + c;
          const tr = tl + 1;
          const bl = tl + size;
          const br = bl + 1;

          const topOwner = edgeOwner.get(edgeKey(tl, tr));
          const botOwner = edgeOwner.get(edgeKey(bl, br));
          const leftOwner = edgeOwner.get(edgeKey(tl, bl));
          const rightOwner = edgeOwner.get(edgeKey(tr, br));

          // Yatay paralel kenarlar dolu, dikey kenarlar boş ise 2x2 alternatif takas oluşur
          if (topOwner !== undefined && botOwner !== undefined && leftOwner === undefined && rightOwner === undefined) {
            if (topOwner === botOwner) intra++;
            else inter++;
          }

          // Dikey paralel kenarlar dolu, yatay kenarlar boş ise 2x2 alternatif takas oluşur
          if (leftOwner !== undefined && rightOwner !== undefined && topOwner === undefined && botOwner === undefined) {
            if (leftOwner === rightOwner) intra++;
            else inter++;
          }
        }
      }
      return { intra, inter };
    }

    /* Aynı satır veya sütunda engelsiz doğrudan görüş kontrolü */
    function hasDirectLineOfSight(a, b, blockedSet, size) {
      const r1 = (a / size) | 0, c1 = a % size;
      const r2 = (b / size) | 0, c2 = b % size;
      if (r1 !== r2 && c1 !== c2) return false;
      const dr = Math.sign(r2 - r1);
      const dc = Math.sign(c2 - c1);
      let r = r1 + dr, c = c1 + dc;
      while (r !== r2 || c !== c2) {
        if (blockedSet.has(r * size + c)) return false;
        r += dr;
        c += dc;
      }
      return true;
    }

    function segScore(seg, size) {
      const detour = (seg.length - 1) - manhattanIdx(seg[0], seg[seg.length - 1], size);
      const selfTouch = countSelfTouches(seg, size);
      return countTurns(seg) + detour * 0.6 - selfTouch * 0.35;
    }

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = (rand() * (i + 1)) | 0;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function generatePuzzle(size, pairs, percentile, floorScore, poolSize, opts = {}) {
      const prevRng = activeRng;
      const code = opts.seedCode || (1000 + Math.floor(Math.random() * 9000));
      const fullSeed = code * 1009 + (opts.gi || 0) * 97 + (opts.li || 0) * 13 + (opts.withObstacles ? 7 : 0);
      activeRng = mulberry32(fullSeed);

      try {
        const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 768;
        const defaultPool = isSmallScreen ? 32 : 60;
        const want = poolSize ? (isSmallScreen ? Math.min(poolSize, 36) : poolSize) : defaultPool;
        const iterations = 220 + size * 70;
        const obsCount = (opts.withObstacles && size >= 3 && (size * size - 1 >= pairs * MIN_PATH_CELLS))
          ? (size >= 7 ? 2 : 1)
          : 0;
        const candidates = [];
        let guard = 0;
        const maxGuard = want * 18;
        const startTs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

        while (candidates.length < want && guard < maxGuard) {
          guard++;
          if (candidates.length >= 6 && (guard & 7) === 0) {
            const nowTs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
            if (nowTs - startTs > 140) break;
          }
          const ham = randomHamiltonian(size, iterations);
          const obsCells = obsCount > 0 ? ham.slice(0, obsCount) : [];
          const usablePath = obsCount > 0 ? ham.slice(obsCount) : ham;
          const segments = splitPath(usablePath, pairs, MIN_PATH_CELLS);
          if (!segments) return null;

          let ok = true;
          const blockedSet = new Set(obsCells);
          for (const seg of segments) {
            blockedSet.add(seg[0]);
            blockedSet.add(seg[seg.length - 1]);
          }

          let collinearPenalty = 0;
          let sameRowOrCol = 0;
          let selfTouchTotal = 0;
          for (const seg of segments) {
            if (countTurns(seg) < 1) { ok = false; break; }
            const a = seg[0], b = seg[seg.length - 1];
            if (manhattanIdx(a, b, size) < 2) { ok = false; break; }
            // Doğrudan düz çizgiyle birleşebilen uçları kesin olarak reddet (mecburi viraj)
            if (hasDirectLineOfSight(a, b, blockedSet, size)) { ok = false; break; }
            const r1 = (a / size) | 0, c1 = a % size;
            const r2 = (b / size) | 0, c2 = b % size;
            if (r1 === r2 || c1 === c2) {
              sameRowOrCol++;
              collinearPenalty += 4.0;
            }
            selfTouchTotal += countSelfTouches(seg, size);
          }
          if (!ok) continue;

          const swaps = count2x2Swaps(segments, size);
          const swapPenalty = swaps.intra * 3.0 + swaps.inter * 0.45;

          candidates.push({
            segments,
            obstacles: obsCells,
            sameRowOrCol,
            intraSwaps: swaps.intra,
            interSwaps: swaps.inter,
            qualityPenalty: collinearPenalty + selfTouchTotal * 0.4 + swapPenalty,
            score: segments.reduce((sum, s) => sum + segScore(s, size), 0) - collinearPenalty - swapPenalty
          });
        }

        if (!candidates.length) return null;
        // Önce hem farklı satır/sütunda olan (sameRowOrCol === 0) hem de 2x2 iç-kıvrımı olmayan adayları seç
        const strictNonAligned = candidates.filter(c => c.sameRowOrCol === 0 && c.intraSwaps === 0);
        const nonAligned = strictNonAligned.length >= 4 ? strictNonAligned : candidates.filter(c => c.sameRowOrCol === 0);
        const zeroIntra = nonAligned.length >= 4 ? nonAligned : candidates.filter(c => c.intraSwaps === 0);
        const pool = zeroIntra.length >= Math.min(6, candidates.length) ? zeroIntra : candidates;
        pool.sort((a, b) => a.score - b.score);

        let idx = Math.round(percentile * (pool.length - 1));
        if (floorScore != null) {
          let found = -1;
          for (let i = idx; i < pool.length; i++) {
            if (pool[i].score > floorScore) { found = i; break; }
          }
          idx = found !== -1 ? found : pool.length - 1;
        }

        const chosen = pool[idx];
        return {
          s: size,
          code,
          obstacles: chosen.obstacles || [],
          score: chosen.score,
          sol: shuffle(chosen.segments.slice()).map(s => s.slice())
        };
      } finally {
        activeRng = prevRng;
      }
    }

    function difficultyRange(gi, li) {
      if (gi === 0) {
        return {
          start: 0.02 + li * 0.06,
          max: 0.25 + li * 0.08,
          step: 0.04
        };
      }
      const base = (gi - 1) * 0.12 + li * 0.05;
      return {
        start: Math.min(0.62, 0.05 + base),
        max: Math.min(0.98, 0.45 + base * 1.15),
        step: 0.05
      };
    }

    function growthEvery(gi, li) {
      return GRADES[gi].levels[li].size <= 3 ? 4 : 8;
    }

    function grownSteps(gi, li, solved) {
      if (gi === 0) return 0;
      return Math.min(2, Math.floor(solved / growthEvery(gi, li)));
    }

    function variantFor(gi, li, solved) {
      const cfg = GRADES[gi].levels[li];
      const grown = grownSteps(gi, li, solved);
      return {
        size: Math.min(cfg.size + grown, MAX_SIZE),
        pairs: cfg.pairs,
        grown
      };
    }

    function percentileFor(gi, li, solved) {
      const r = difficultyRange(gi, li);
      const inVariant = solved - growthEvery(gi, li) * grownSteps(gi, li, solved);
      return Math.min(r.max, r.start + inVariant * r.step);
    }

    /* Uygulama Durumu */
    let gradeIdx = 0;
    let levelIdx = 0;
    let size = 3;
    let letters = [];
    let endpoints = {};
    let solution = {};
    let obstacles = [];
    let paths = {};
    let historyStack = []; // Geri al (Undo) için hamle geçmişi
    let puzzleScore = 0;
    let currentSeedCode = 1000;

    let activeLetter = null;
    let tapLetter = null;
    let isDrawing = false;
    let lastCell = null;
    let lastDir = null;
    let lastSvgPt = null;
    let cellGap = 48;
    let pad = 10;

    let hintsUsed = 0;
    let hintStageByLetter = {};
    let hintArmed = false;
    let pendingFloor = null;
    let puzzleSolved = false;
    let obstacleMode = false;
    let dailyMode = false;
    let tournamentMode = false;
    let tournamentStageIdx = 0;
    let tournamentTimerInterval = null;
    let patternMode = false;
    let symbolThemeIdx = 0;
    let rushMode = false;
    let rushTimeLeft = 60;
    let rushSolved = 0;
    let rushInterval = null;
    let memoryMode = false;
    let memoryHidden = false;
    let memoryTimer = null;
    let memoryCountdown = 0;
    let memoryTotalSec = 5;
    let memoryPeeksLeft = 2;
    let memoryColorHint = true;
    let memoryPeekTimeout = null;
    let tempRevealedLetter = null;
    let tempRevealTimeout = null;
    let streakCount = 0;
    let puzzleStartTime = Date.now();
    let undoOrClearUsed = false;
    let lastNoteTime = 0;
    let autoCheckTimer = null;

    let appData = loadAppData();

    const appRoot = document.getElementById('appRoot');
    const singleBoardSection = document.getElementById('singleBoardSection');
    const boardSvg = document.getElementById('boardSvg');
    const boardFrame = document.getElementById('boardFrame');
    const gradeButtonsEl = document.getElementById('gradeButtons');
    const levelButtonsEl = document.getElementById('levelButtons');
    const statusEl = document.getElementById('status');
    const noteEl = document.getElementById('note');
    const btnClear = document.getElementById('btnClear');
    const btnUndo = document.getElementById('btnUndo');
    const btnHint = document.getElementById('btnHint');
    const btnCheck = document.getElementById('btnCheck');
    const btnNew = document.getElementById('btnNew');
    const btnSymbolTheme = document.getElementById('btnSymbolTheme');
    const btnPattern = document.getElementById('btnPattern');
    const btnSound = document.getElementById('btnSound');
    const btnTheme = document.getElementById('btnTheme');
    const btnDaily = document.getElementById('btnDaily');
    const btnSeed = document.getElementById('btnSeed');
    const seedBtnLabel = document.getElementById('seedBtnLabel');
    const btnObstacle = document.getElementById('btnObstacle');
    const btnRush = document.getElementById('btnRush');
    const btnMemory = document.getElementById('btnMemory');
    const btnTournament = document.getElementById('btnTournament');
    const tourneyBtnLabel = document.getElementById('tourneyBtnLabel');
    const btnBadges = document.getElementById('btnBadges');
    const badgeBtnCount = document.getElementById('badgeBtnCount');
    const rushBanner = document.getElementById('rushBanner');
    const rushSolvedEl = document.getElementById('rushSolvedEl');
    const rushBestEl = document.getElementById('rushBestEl');
    const rushTimerEl = document.getElementById('rushTimerEl');
    
    const statTotalSolved = document.getElementById('statTotalSolved');
    const statScore = document.getElementById('statScore');
    const statStreak = document.getElementById('statStreak');
    const statBadge = document.getElementById('statBadge');
    const statBadgeWrap = document.getElementById('statBadgeWrap');

    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastStars = document.getElementById('toastStars');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMsg');
    const toastNext = document.getElementById('toastNext');
    const toastClose = document.getElementById('toastClose');
    const overlay = document.getElementById('overlay');
    const confettiEl = document.getElementById('confetti');
    const tutorialModal = document.getElementById('tutorialModal');

    /* Ses Motoru (Web Audio API - Nota Merdiveni ve Melodi Sesleri) */
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    let soundEnabled = true;

    function playTone(freq, start, dur, type = 'sine', vol = 0.12) {
      if (!soundEnabled) return;
      try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const ctx = audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(vol, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      } catch (_) {}
    }
    function playStepNote(stepLen) {
      if (!soundEnabled) return;
      const now = performance.now();
      if (now - lastNoteTime < 42) return;
      lastNoteTime = now;
      const idx = Math.max(0, (stepLen - 1)) % SCALE_NOTES.length;
      playTone(SCALE_NOTES[idx], 0, 0.09, 'triangle', 0.09);
    }
    function playPathComplete() {
      playTone(587.33, 0, 0.14, 'sine', 0.12);
      playTone(880.00, 0.07, 0.20, 'sine', 0.13);
    }
    function playSuccess() {
      [523, 659, 784, 1047].forEach((n, i) => playTone(n, i * 0.11, 0.26, 'sine', 0.14));
    }
    function playLevelUpFanfare() {
      // Seviye ve zorluk kademesi atlama müzikal arpej fanfarı
      [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98].forEach((n, i) => {
        playTone(n, i * 0.085, 0.28, 'triangle', 0.15);
      });
    }
    function playError() {
      // DEHB & Kaygı Dostu Yumuşak Akustik Geri Bildirim (Sert 'square' dalga yerine sıcak 'triangle/sine')
      playTone(330, 0, 0.14, 'triangle', 0.06);
      playTone(262, 0.12, 0.18, 'sine', 0.05);
    }
    function playClick() { playTone(440, 0, 0.04, 'triangle', 0.08); }
    function playHint() {
      [700, 900, 1100].forEach((n, i) => playTone(n, i * 0.08, 0.2, 'triangle', 0.1));
    }

    /* Veri Yönetimi ve İstatistikler */
    function loadAppData() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return Object.assign({
          progress: {}, tourProgress: {}, unlockedIdx: 0,
          goldTour: 0, goldCrowns: {},
          score: 0, sound: true, dark: false, pattern: false,
          symbolTheme: 0, firstTime: false, achievements: {},
          noHintWins: 0, obstacleWins: 0, bestRush: 0
        }, parsed);
      } catch (_) {
        return {
          progress: {}, tourProgress: {}, unlockedIdx: 0,
          goldTour: 0, goldCrowns: {},
          score: 0, sound: true, dark: false, pattern: false,
          symbolTheme: 0, firstTime: false, achievements: {},
          noHintWins: 0, obstacleWins: 0, bestRush: 0
        };
      }
    }
    function saveAppData() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(appData)); } catch (_) {}
    }
    const EDU_MAX_UNLOCKED_IDX = 12; // Eğitici temalar en fazla 6x6 (Orta · Seviye 3 = index 12)

    function getEduThemeProgress(themeId) {
      if (!appData.eduProgress) appData.eduProgress = {};
      if (!appData.eduProgress[themeId]) {
        appData.eduProgress[themeId] = {
          progress: {},
          tourProgress: {},
          unlockedIdx: 0,
          gradeIdx: 0,
          levelIdx: 0
        };
      }
      return appData.eduProgress[themeId];
    }

    function getActiveProgressStore() {
      const theme = getActiveSymbolTheme();
      if (theme && theme.isEdu) {
        return getEduThemeProgress(theme.id);
      }
      return appData;
    }

    function saveCurrentThemePosition() {
      const theme = getActiveSymbolTheme();
      if (theme && theme.isEdu) {
        const store = getEduThemeProgress(theme.id);
        store.gradeIdx = gradeIdx;
        store.levelIdx = levelIdx;
      } else {
        appData.classicGradeIdx = gradeIdx;
        appData.classicLevelIdx = levelIdx;
      }
    }

    function loadCurrentThemePosition() {
      const theme = getActiveSymbolTheme();
      if (theme && theme.isEdu) {
        const store = getEduThemeProgress(theme.id);
        gradeIdx = Math.max(0, Math.min(2, store.gradeIdx || 0));
        levelIdx = Math.max(0, Math.min(4, store.levelIdx || 0));
        if (gradeIdx * 5 + levelIdx > EDU_MAX_UNLOCKED_IDX) {
          gradeIdx = 2;
          levelIdx = 2;
        }
      } else {
        const maxU = Math.min(29, appData.unlockedIdx || 0);
        const defGi = Math.floor(maxU / 5);
        const defLi = maxU % 5;
        gradeIdx = (typeof appData.classicGradeIdx === 'number') ? Math.max(0, Math.min(5, appData.classicGradeIdx)) : defGi;
        levelIdx = (typeof appData.classicLevelIdx === 'number') ? Math.max(0, Math.min(4, appData.classicLevelIdx)) : defLi;
        if (!isLevelUnlocked(gradeIdx, levelIdx)) {
          gradeIdx = defGi;
          levelIdx = defLi;
        }
      }
    }

    function levelKey(gi, li) { return `g${GRADES[gi].grade}-l${GRADES[gi].levels[li].level}`; }
    function solvedCount(gi, li) {
      const store = getActiveProgressStore();
      return ((store.progress && store.progress[levelKey(gi, li)]) || 0);
    }
    function requiredForLevel(gi) { return gi <= 2 ? 2 : 3; }
    function tourSolvedCount(gi, li) {
      const store = getActiveProgressStore();
      if (!store.tourProgress) store.tourProgress = {};
      return (store.tourProgress[levelKey(gi, li)] || 0);
    }
    function isLevelUnlocked(gi, li) {
      if (isEduThemeActive()) {
        const gIdx = gi * 5 + li;
        if (gIdx > EDU_MAX_UNLOCKED_IDX) return false;
        const store = getActiveProgressStore();
        return gIdx <= (store.unlockedIdx || 0);
      }
      if ((appData.goldTour || 0) > 0) return true;
      return (gi * 5 + li) <= (appData.unlockedIdx || 0);
    }
    function isGradeUnlocked(gi) {
      return isLevelUnlocked(gi, 0);
    }
    function hasGoldCrown(gi, li) {
      if (isEduThemeActive()) return false;
      return !!(appData.goldCrowns && appData.goldCrowns[levelKey(gi, li)]);
    }
    function countGoldCrowns() {
      return Object.keys(appData.goldCrowns || {}).length;
    }
    function goldTargetSec(gi, li) {
      const sz = GRADES[gi].levels[li].size;
      return sz * 10;
    }
    function updateGoldTourBanner() {
      const banner = document.getElementById('goldTourBanner');
      const titleEl = document.getElementById('goldTourTitle');
      const countEl = document.getElementById('goldTourCount');
      if (!banner) return;
      const tour = appData.goldTour || 0;
      if (tour > 0) {
        banner.classList.add('show');
        const tourName = tour === 1 ? '🌟 ALTIN YILDIZ TURU' : (tour === 2 ? '💎 ELMAS YILDIZ TURU' : `🔥 ${tour}. EFSANE TURU`);
        if (titleEl) titleEl.textContent = `${tourName} · Hedef Sürede ve İpucusuz Çöz, Taçları Topla!`;
        if (countEl) countEl.textContent = `👑 ${countGoldCrowns()} / 30 Taç`;
      } else {
        banner.classList.remove('show');
      }
    }

    function unlockAchievement(id) {
      if (!appData.achievements) appData.achievements = {};
      if (appData.achievements[id]) return null;
      appData.achievements[id] = Date.now();
      saveAppData();
      return ACHIEVEMENTS.find(a => a.id === id) || null;
    }

    function addSolved(gi, li) {
      const k = levelKey(gi, li);
      const store = getActiveProgressStore();
      if (!store.progress) store.progress = {};
      store.progress[k] = (store.progress[k] || 0) + 1;
      if (!store.tourProgress) store.tourProgress = {};
      store.tourProgress[k] = (store.tourProgress[k] || 0) + 1;
      if (isEduThemeActive()) {
        appData.eduTotalSolved = (appData.eduTotalSolved || 0) + 1;
      }
      appData.tutorialSeen = true;
      streakCount++;
      const streakBonus = Math.min(50, streakCount * 10);
      const gainedPts = (gradeIdx + 1) * 20 + (levelIdx + 1) * 10 + (obstacleMode ? 15 : 0) + (memoryMode ? 20 : 0) + streakBonus;
      if (typeof ensureLeagueWeekSync === 'function') ensureLeagueWeekSync();
      appData.score = (appData.score || 0) + gainedPts;
      appData.weeklyLeagueScore = (appData.weeklyLeagueScore || 0) + gainedPts;
      if (hintsUsed === 0) appData.noHintWins = (appData.noHintWins || 0) + 1;
      if (obstacleMode) appData.obstacleWins = (appData.obstacleWins || 0) + 1;
      saveAppData();
      updateStatsUI();
      updateGoldTourBanner();
    }

    function gradeSolved(gi) {
      return GRADES[gi].levels.reduce((sum, _, li) => sum + solvedCount(gi, li), 0);
    }

    function updateStatsUI() {
      let total = appData.eduTotalSolved || 0;
      Object.values(appData.progress || {}).forEach(v => total += v);
      statTotalSolved.textContent = total;
      statScore.textContent = appData.score;
      statStreak.textContent = `🔥 ${streakCount}`;

      const unlockedCount = Object.keys(appData.achievements || {}).length;
      if (badgeBtnCount) badgeBtnCount.textContent = `Kupalar (${unlockedCount}/${ACHIEVEMENTS.length})`;
      if (typeof updateProfileButtonUI === 'function') updateProfileButtonUI();
    }

    function getMemoryGradeConfig(gi = gradeIdx) {
      if (gi === 0) {
        return {
          tierName: '🌱 Çok Kolay · Yarı-Hafıza (Başlangıç Uçları Açık)',
          halfHide: true,
          defaultColorHint: true,
          peeks: 3,
          seconds: Math.min(12, Math.max(8, letters.length * 2 + 2))
        };
      }
      if (gi === 1) {
        return {
          tierName: '⭐ Kolay · Renk Halkalı Hafıza',
          halfHide: false,
          defaultColorHint: true,
          peeks: 3,
          seconds: Math.min(11, Math.max(7, letters.length * 2 + 1))
        };
      }
      if (gi === 2 || gi === 3) {
        return {
          tierName: `🔥 ${GRADES[gi] ? GRADES[gi].label : 'Orta'} · Klasik Tam Hafıza`,
          halfHide: false,
          defaultColorHint: false,
          peeks: 2,
          seconds: Math.min(10, Math.max(6, Math.round(letters.length * 1.6)))
        };
      }
      return {
        tierName: `👑 ${GRADES[gi] ? GRADES[gi].label : 'Uzman'} · Usta Hafıza (Hızlı Süre)`,
        halfHide: false,
        defaultColorHint: false,
        peeks: 1,
        seconds: Math.min(8, Math.max(4, Math.round(letters.length * 1.1)))
      };
    }

    let activeEduPairs = {};

    function getActiveSymbolTheme() {
      return SYMBOL_THEMES[symbolThemeIdx] || SYMBOL_THEMES[0];
    }

    function isEduThemeActive() {
      const theme = getActiveSymbolTheme();
      return !!(theme && theme.isEdu);
    }

    const MATH_GRADE_META = {
      1: {
        label: '1. Sınıf',
        desc: '1. Sınıf: 20\'ye kadar Toplama (+) ve Çıkarma (-)',
        engDesc: '1. Sınıf İngilizce: Temel renkler, 1–5 sayılar, ilk kelimeler',
        antDesc: '1. Sınıf Zıt Anlam: Temel günlük zıt sözcükler (Az–Çok, Aç–Tok, Gece–Gündüz)',
        synDesc: '1. Sınıf Eş Anlam: İlköğretim temel eş anlamlılar (Al–Kırmızı, Ak–Beyaz, Ad–İsim)'
      },
      2: {
        label: '2. Sınıf',
        desc: '2. Sınıf: Toplama, Çıkarma, Kolay Çarpma (×) ve Kalansız Bölme (÷)',
        engDesc: '2. Sınıf İngilizce: Sınıf eşyaları, hayvanlar, vücut ve meyveler',
        antDesc: '2. Sınıf Zıt Anlam: Sıfatlar, yönler ve durumlar (Dar–Geniş, Kolay–Zor, Erken–Geç)',
        synDesc: '2. Sınıf Eş Anlam: Okuma-anlama sözcükleri (Yanıt–Cevap, Öykü–Hikaye, Konuk–Misafir)'
      },
      3: {
        label: '3. Sınıf',
        desc: '3. Sınıf: 100\'e kadar Dört İşlem (+, -, ×, ÷)',
        engDesc: '3. Sınıf İngilizce: Aile, duygular, hava durumu, ev ve ulaşım',
        antDesc: '3. Sınıf Zıt Anlam: Kavramlar ve davranışlar (Cömert–Cimri, Cesur–Korkak, Taze–Bayat)',
        synDesc: '3. Sınıf Eş Anlam: Orta düzey sözcükler (Duygu–His, Görev–Vazife, Özlem–Hasret)'
      },
      4: {
        label: '4. Sınıf',
        desc: '4. Sınıf: İleri Dört İşlem (+, -, ×, ÷)',
        engDesc: '4. Sınıf İngilizce: Meslekler, günler, fiiller ve dersler',
        antDesc: '4. Sınıf Zıt Anlam: İleri ilkokul kavramları (Somut–Soyut, Tekil–Çoğul, Üretici–Tüketici)',
        synDesc: '4. Sınıf Eş Anlam: Zengin söz varlığı (Neden–Sebep, Kanıt–Delil, Tedbir–Önlem)'
      }
    };

    function getMathGrade() {
      const g = parseInt(appData.mathGrade, 10);
      return (g >= 1 && g <= 4) ? g : 2;
    }

    const MATH_OP_LABELS = {
      all: 'Dört İşlem',
      add: 'Toplama (+)',
      sub: 'Çıkarma (-)',
      mul: 'Çarpma (×)',
      div: 'Bölme (÷)'
    };

    function getMathOp() {
      const mg = getMathGrade();
      const raw = appData.mathOp || 'all';
      if (mg === 1 && (raw === 'mul' || raw === 'div')) return 'all';
      return ['all', 'add', 'sub', 'mul', 'div'].includes(raw) ? raw : 'all';
    }

    function getMathTable() {
      const mg = getMathGrade();
      const raw = appData.mathTable || 'all';
      if (raw === 'all') return 'all';
      const n = parseInt(raw, 10);
      if (!(n >= 2 && n <= 10)) return 'all';
      if (mg === 2 && n > 5) return 'all';
      return String(n);
    }

    function getMathOpBadgeLabel() {
      const mg = getMathGrade();
      const op = getMathOp();
      if (op === 'all') return mg === 1 ? 'Toplama & Çıkarma' : 'Dört İşlem';
      if (op === 'mul') {
        const tbl = getMathTable();
        if (tbl !== 'all') return `${tbl}'ler Çarpım`;
      }
      return MATH_OP_LABELS[op] || 'Dört İşlem';
    }

    const CONCRETE_EDU_POOLS = {
      english: {
        low: [
          ['Cat', '🐱'], ['Dog', '🐶'], ['Sun', '☀️'], ['Moon', '🌙'],
          ['Star', '⭐'], ['Apple', '🍎'], ['Banana', '🍌'], ['Car', '🚗'],
          ['Fish', '🐟'], ['Bird', '🐦'], ['Frog', '🐸'], ['Ball', '⚽'],
          ['Book', '📖'], ['Tree', '🌳']
        ],
        high: [
          ['Train', '🚂'], ['Plane', '✈️'], ['Doctor', '🩺'], ['Chef', '👨‍🍳'],
          ['Rainy', '🌧️'], ['Sunny', '☀️'], ['Snowy', '❄️'], ['Happy', '😄'],
          ['Sad', '😢'], ['Clock', '🕒'], ['Music', '🎵'], ['Flower', '🌸']
        ]
      },
      antonyms: {
        low: [
          ['☀️ Gündüz', '🌙 Gece'], ['🔥 Sıcak', '❄️ Soğuk'],
          ['😄 Mutlu', '😢 Üzgün'], ['🐢 Yavaş', '🐇 Hızlı'],
          ['🐘 Büyük', '🐜 Küçük'], ['⬆️ Üst', '⬇️ Alt'],
          ['🌞 Yaz', '⛄ Kış'], ['🍎 Tatlı', '🌶️ Acı']
        ],
        high: [
          ['💡 Aydınlık', '🌑 Karanlık'], ['🕊️ Barış', '⚔️ Savaş'],
          ['🦁 Cesur', '🐭 Korkak'], ['🌿 Doğal', '🤖 Yapay'],
          ['➕ Artı', '➖ Eksi'], ['😄 Mutlu', '😢 Üzgün'],
          ['🐢 Yavaş', '🐇 Hızlı'], ['🔥 Sıcak', '❄️ Soğuk']
        ]
      },
      synonyms: {
        low: [
          ['🏠 Ev', '🏠 Konut'], ['🎁 Armağan', '🎁 Hediye'],
          ['🩺 Hekim', '🩺 Doktor'], ['🏫 Okul', '🏫 Mektep'],
          ['🎒 Öğrenci', '🎒 Talebe'], ['🏖️ Kıyı', '🏖️ Sahil'],
          ['🌿 Doğa', '🌿 Tabiat'], ['💭 Düş', '💭 Rüya']
        ],
        high: [
          ['❤️ Kalp', '❤️ Yürek'], ['🍂 Güz', '🍂 Sonbahar'],
          ['🏙️ Şehir', '🏙️ Kent'], ['🌍 Dünya', '🌍 Cihan'],
          ['🚩 Bayrak', '🚩 Sancak'], ['🕊️ Barış', '🕊️ Sulh'],
          ['⚔️ Savaş', '⚔️ Harp'], ['🔍 Kanıt', '🔍 Delil']
        ]
      }
    };

    function generateMathEduPairs(count) {
      const mg = getMathGrade();
      const opSel = getMathOp();
      const usedResults = new Set();
      const pairs = [];

      // Tahtada seçili işlemlerin dengeli dağılması için ilk tura geçerli işlemleri karıştırarak koy
      const allowedOps = opSel !== 'all'
        ? [opSel]
        : (mg === 1 ? ['add', 'sub'] : ['add', 'sub', 'mul', 'div']);
      const opsQueue = [];
      while (opsQueue.length < count + 12) {
        const batch = allowedOps.slice();
        for (let i = batch.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [batch[i], batch[j]] = [batch[j], batch[i]];
        }
        opsQueue.push(...batch);
      }

      let tries = 0;
      let opIdx = 0;
      const mulTable = getMathTable();
      while (pairs.length < count && tries < 400) {
        tries++;
        const mode = opsQueue[opIdx % opsQueue.length];
        opIdx++;
        let expr = '';
        let res = 0;

        if (mode === 'mul' && mulTable !== 'all' && mg >= 2) {
          // Seçilen çarpım tablosuna göre üret (ör. 6'lar: 6×2..6×10)
          const t = parseInt(mulTable, 10);
          const b = 1 + Math.floor(Math.random() * 10);
          res = t * b;
          expr = Math.random() < 0.7 ? `${t}×${b}` : `${b}×${t}`;
          if (!usedResults.has(res)) {
            usedResults.add(res);
            pairs.push([expr, String(res)]);
          }
          continue;
        }

        if (mg === 1) {
          // 1. Sınıf: Çok Kolay (gradeIdx===0) kademesinde somut nesne sayma & görsel toplama
          if (mode === 'add' && gradeIdx === 0) {
            const icons = ['🍎', '⭐', '🐶', '🎈', '🍓', '🚗'];
            const ic = icons[Math.floor(Math.random() * icons.length)];
            if (Math.random() < 0.55) {
              const n = 1 + Math.floor(Math.random() * 4); // 1..4 nesne
              res = n;
              expr = ic.repeat(n);
            } else {
              const a = 1 + Math.floor(Math.random() * 2); // 1..2
              const b = 1 + Math.floor(Math.random() * 2); // 1..2
              res = a + b;
              expr = `${ic.repeat(a)}+${ic.repeat(b)}`;
            }
          } else if (mode === 'add') {
            const a = 1 + Math.floor(Math.random() * 10);
            const maxB = Math.max(1, 20 - a);
            const b = 1 + Math.floor(Math.random() * Math.min(10, maxB));
            res = a + b;
            expr = `${a}+${b}`;
          } else {
            const b = 1 + Math.floor(Math.random() * 9);
            const r = 1 + Math.floor(Math.random() * (19 - b));
            const a = b + r;
            res = r;
            expr = `${a}-${b}`;
          }
        } else if (mg === 2) {
          // 2. Sınıf: 60'a kadar toplama/çıkarma, 2-5 çarpım tablosu ve basit kalansız bölme
          if (mode === 'add') {
            const a = 5 + Math.floor(Math.random() * 31);
            const b = 3 + Math.floor(Math.random() * 23);
            res = a + b;
            expr = `${a}+${b}`;
          } else if (mode === 'sub') {
            const b = 3 + Math.floor(Math.random() * 18);
            const r = 4 + Math.floor(Math.random() * 27);
            const a = b + r;
            res = r;
            expr = `${a}-${b}`;
          } else if (mode === 'mul') {
            const a = 2 + Math.floor(Math.random() * 4);
            const b = 2 + Math.floor(Math.random() * 8);
            res = a * b;
            expr = `${a}×${b}`;
          } else {
            const b = 2 + Math.floor(Math.random() * 4);
            const q = 2 + Math.floor(Math.random() * 8);
            const a = b * q;
            res = q;
            expr = `${a}÷${b}`;
          }
        } else if (mg === 3) {
          // 3. Sınıf: 100'e kadar dört işlem (3-9 çarpım tablosu & kalansız bölme)
          if (mode === 'add') {
            const a = 12 + Math.floor(Math.random() * 44);
            const b = 11 + Math.floor(Math.random() * 35);
            res = a + b;
            expr = `${a}+${b}`;
          } else if (mode === 'sub') {
            const b = 11 + Math.floor(Math.random() * 30);
            const r = 10 + Math.floor(Math.random() * 46);
            const a = b + r;
            res = r;
            expr = `${a}-${b}`;
          } else if (mode === 'mul') {
            const a = 3 + Math.floor(Math.random() * 7);
            const b = 3 + Math.floor(Math.random() * 7);
            res = a * b;
            expr = `${a}×${b}`;
          } else {
            const b = 2 + Math.floor(Math.random() * 8);
            const q = 2 + Math.floor(Math.random() * 8);
            const a = b * q;
            res = q;
            expr = `${a}÷${b}`;
          }
        } else {
          // 4. Sınıf: İleri dört işlem (2 basamaklı zihinden işlemler, 2 basamak×1 basamak, kalansız bölme)
          if (mode === 'add') {
            const a = 25 + Math.floor(Math.random() * 96);
            const b = 15 + Math.floor(Math.random() * 66);
            res = a + b;
            expr = `${a}+${b}`;
          } else if (mode === 'sub') {
            const b = 15 + Math.floor(Math.random() * 51);
            const r = 15 + Math.floor(Math.random() * 81);
            const a = b + r;
            res = r;
            expr = `${a}-${b}`;
          } else if (mode === 'mul') {
            const a = 11 + Math.floor(Math.random() * 9);
            const b = 2 + Math.floor(Math.random() * 8);
            res = a * b;
            expr = `${a}×${b}`;
          } else {
            const b = 3 + Math.floor(Math.random() * 7);
            const q = 4 + Math.floor(Math.random() * 12);
            const a = b * q;
            res = q;
            expr = `${a}÷${b}`;
          }
        }

        if (!usedResults.has(res)) {
          usedResults.add(res);
          pairs.push([expr, String(res)]);
        }
      }
      return pairs;
    }

    function prepareEduPairsForPuzzle(letterList) {
      activeEduPairs = {};
      const theme = getActiveSymbolTheme();
      if (!theme || !theme.isEdu || !Array.isArray(letterList)) return;

      if (theme.isMath) {
        const mathPairs = generateMathEduPairs(letterList.length);
        letterList.forEach((l, idx) => {
          const p = mathPairs[idx] || [`${idx + 1}+1`, String(idx + 2)];
          activeEduPairs[l] = Math.random() < 0.5 ? [p[0], p[1]] : [p[1], p[0]];
        });
        return;
      }

      const mg = getMathGrade();
      const concreteGrp = (gradeIdx === 0 && CONCRETE_EDU_POOLS[theme.id])
        ? CONCRETE_EDU_POOLS[theme.id][mg <= 2 ? 'low' : 'high']
        : null;
      const sourcePool = concreteGrp
        ? concreteGrp
        : ((theme.pairsByGrade && theme.pairsByGrade[mg])
            ? theme.pairsByGrade[mg]
            : (theme.pairsPool || []));
      const pool = sourcePool.slice();
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      letterList.forEach((l, idx) => {
        const p = pool[idx % Math.max(1, pool.length)] || [l, l];
        activeEduPairs[l] = Math.random() < 0.5 ? [p[0], p[1]] : [p[1], p[0]];
      });
    }

    function getSymbol(letter, forPlayerPaths, epIdx) {
      const theme = getActiveSymbolTheme();
      let sym = theme.map[letter] || letter;
      if (theme.isEdu && activeEduPairs[letter]) {
        if (forPlayerPaths) {
          sym = `${activeEduPairs[letter][0]}↔${activeEduPairs[letter][1]}`;
        } else {
          sym = epIdx === 1 ? activeEduPairs[letter][1] : activeEduPairs[letter][0];
        }
      }
      if (!forPlayerPaths && memoryMode && memoryHidden) {
        const memCfg = getMemoryGradeConfig(gradeIdx);
        // Çok Kolay (Yarı-Hafıza) kademesinde her harfin ilk ucu (epIdx === 0) açık kalır, sadece eşi (epIdx === 1) '?' olur!
        if (memCfg.halfHide && epIdx === 0) {
          return sym;
        }
        if (!isPathComplete(letter) && activeLetter !== letter && tapLetter !== letter && tempRevealedLetter !== letter) {
          return '?';
        }
      }
      return sym;
    }

    const btnOpenThemeModal = document.getElementById('btnOpenThemeModal');
    const btnToggleExtraTools = document.getElementById('btnToggleExtraTools');
    const extraToolsDrawer = document.getElementById('extraToolsDrawer');
    if (btnToggleExtraTools && extraToolsDrawer) {
      btnToggleExtraTools.addEventListener('click', () => {
        playClick();
        const isOpen = extraToolsDrawer.classList.toggle('open');
        btnToggleExtraTools.innerHTML = isOpen ? '<span>⚙️</span><span>Gizle ▴</span>' : '<span>⚙️</span><span>Modlar ▾</span>';
      });
    }

    function updateSymbolThemeUI() {
      const theme = getActiveSymbolTheme();
      const mg = getMathGrade();
      if (btnSymbolTheme) {
        const displayTheme = (theme && !theme.isEdu) ? theme : SYMBOL_THEMES[0];
        btnSymbolTheme.textContent = displayTheme.icon;
        btnSymbolTheme.title = `Klasik Sembol Değiştir (Şu an: ${theme.name})`;
      }
      if (btnOpenThemeModal) {
        const label = theme.isEdu ? `${theme.name} (${mg}.S)` : `Tema Seç`;
        btnOpenThemeModal.innerHTML = `<span>${theme.isEdu ? theme.icon : '🎨'}</span><span>${label}</span>`;
      }
    }

    const themeOverlay = document.getElementById('themeOverlay');
    const themeModal = document.getElementById('themeModal');
    const themeTabClassic = document.getElementById('themeTabClassic');
    const themeTabEdu = document.getElementById('themeTabEdu');
    const classicThemePane = document.getElementById('classicThemePane');
    const eduThemePane = document.getElementById('eduThemePane');
    const eduThemeGrid = document.getElementById('eduThemeGrid');
    const classicThemeGrid = document.getElementById('classicThemeGrid');
    const mathGradeRow = document.getElementById('mathGradeRow');
    const mathOpRow = document.getElementById('mathOpRow');
    const mathOpWrap = document.getElementById('mathOpWrap');
    const mathTableWrap = document.getElementById('mathTableWrap');
    const mathTableRow = document.getElementById('mathTableRow');
    const mathGradeHint = document.getElementById('mathGradeHint');
    const chkEduNeutralColor = document.getElementById('chkEduNeutralColor');
    const btnEduPlay = document.getElementById('btnEduPlay');
    const themeClose = document.getElementById('themeClose');
    let pendingEduThemeIdx = null;

    function getDefaultEduThemeIdx() {
      const cur = getActiveSymbolTheme();
      if (cur && cur.isEdu) return symbolThemeIdx;
      const firstEdu = SYMBOL_THEMES.findIndex(t => t.isEdu);
      return firstEdu >= 0 ? firstEdu : 0;
    }

    function setThemeModalTab(tab) {
      const isEduTab = tab === 'edu';
      if (themeTabClassic) themeTabClassic.classList.toggle('active', !isEduTab);
      if (themeTabEdu) themeTabEdu.classList.toggle('active', isEduTab);
      if (classicThemePane) classicThemePane.style.display = isEduTab ? 'none' : 'block';
      if (eduThemePane) eduThemePane.style.display = isEduTab ? 'block' : 'none';
      if (btnEduPlay) btnEduPlay.style.display = isEduTab ? '' : 'none';
      if (themeClose) themeClose.style.gridColumn = isEduTab ? '' : '1 / -1';
      if (isEduTab && pendingEduThemeIdx === null) {
        pendingEduThemeIdx = getDefaultEduThemeIdx();
        renderThemeModal();
      }
    }

    if (themeTabClassic) themeTabClassic.addEventListener('click', () => { playClick(); setThemeModalTab('classic'); });
    if (themeTabEdu) themeTabEdu.addEventListener('click', () => { playClick(); setThemeModalTab('edu'); });

    function updateMathGradeModalUI() {
      const mg = getMathGrade();
      const opSel = getMathOp();
      const tblSel = getMathTable();
      const modalOpen = !!(themeModal && themeModal.classList.contains('show'));
      const previewTheme = (modalOpen && pendingEduThemeIdx !== null && SYMBOL_THEMES[pendingEduThemeIdx])
        ? SYMBOL_THEMES[pendingEduThemeIdx]
        : getActiveSymbolTheme();
      if (mathGradeRow) {
        mathGradeRow.querySelectorAll('.math-grade-btn[data-mgrade]').forEach(btn => {
          const g = parseInt(btn.getAttribute('data-mgrade'), 10);
          btn.classList.toggle('active', g === mg);
        });
      }
      if (mathOpWrap) {
        mathOpWrap.style.opacity = (previewTheme && previewTheme.isMath) ? '1' : '0.68';
      }
      if (mathOpRow) {
        mathOpRow.querySelectorAll('.math-op-btn[data-mop]').forEach(btn => {
          const op = btn.getAttribute('data-mop');
          const locked = mg === 1 && (op === 'mul' || op === 'div');
          btn.disabled = locked;
          btn.classList.toggle('disabled', locked);
          btn.classList.toggle('active', !locked && op === opSel);
        });
      }
      if (mathTableWrap) {
        mathTableWrap.classList.toggle('show', opSel === 'mul' && mg >= 2);
      }
      if (mathTableRow) {
        mathTableRow.querySelectorAll('.math-table-btn[data-mtable]').forEach(btn => {
          const val = btn.getAttribute('data-mtable');
          const num = parseInt(val, 10);
          const locked = (val !== 'all') && (mg === 2 && num > 5);
          btn.disabled = locked;
          btn.classList.toggle('disabled', locked);
          btn.classList.toggle('active', !locked && val === tblSel);
        });
      }
      if (mathGradeHint) {
        const meta = MATH_GRADE_META[mg] || MATH_GRADE_META[2];
        if (previewTheme && previewTheme.id === 'english') mathGradeHint.textContent = meta.engDesc;
        else if (previewTheme && previewTheme.id === 'antonyms') mathGradeHint.textContent = meta.antDesc;
        else if (previewTheme && previewTheme.id === 'synonyms') mathGradeHint.textContent = meta.synDesc;
        else mathGradeHint.textContent = `${meta.desc} · Seçili işlem: ${getMathOpBadgeLabel()}`;
      }
    }

    function setMathGrade(g) {
      const next = Math.max(1, Math.min(4, parseInt(g, 10) || 2));
      appData.mathGrade = next;
      if (next === 1 && (appData.mathOp === 'mul' || appData.mathOp === 'div')) {
        appData.mathOp = 'all';
      }
      if (next === 2 && parseInt(appData.mathTable, 10) > 5) {
        appData.mathTable = 'all';
      }
      playClick();
      saveAppData();
      updateMathGradeModalUI();
      updateSymbolThemeUI();
      const modalOpen = !!(themeModal && themeModal.classList.contains('show'));
      const theme = getActiveSymbolTheme();
      if (!modalOpen && theme && (theme.isMath || theme.usesGrade)) {
        newPuzzle();
      }
    }

    function setMathOp(op) {
      const mg = getMathGrade();
      if (mg === 1 && (op === 'mul' || op === 'div')) return;
      appData.mathOp = ['all', 'add', 'sub', 'mul', 'div'].includes(op) ? op : 'all';
      playClick();
      saveAppData();
      updateMathGradeModalUI();
      updateSymbolThemeUI();
      const modalOpen = !!(themeModal && themeModal.classList.contains('show'));
      const theme = getActiveSymbolTheme();
      if (!modalOpen && theme && theme.isMath) {
        newPuzzle();
      }
    }

    function setMathTable(val) {
      const mg = getMathGrade();
      if (mg < 2) return;
      if (val !== 'all') {
        const n = parseInt(val, 10);
        if (!(n >= 2 && n <= 10) || (mg === 2 && n > 5)) return;
        appData.mathTable = String(n);
      } else {
        appData.mathTable = 'all';
      }
      playClick();
      saveAppData();
      updateMathGradeModalUI();
      updateSymbolThemeUI();
      const modalOpen = !!(themeModal && themeModal.classList.contains('show'));
      const theme = getActiveSymbolTheme();
      if (!modalOpen && theme && theme.isMath) {
        newPuzzle();
      }
    }

    if (mathGradeRow) {
      mathGradeRow.querySelectorAll('.math-grade-btn[data-mgrade]').forEach(btn => {
        btn.addEventListener('click', () => {
          const g = parseInt(btn.getAttribute('data-mgrade'), 10);
          setMathGrade(g);
        });
      });
    }
    if (mathOpRow) {
      mathOpRow.querySelectorAll('.math-op-btn[data-mop]').forEach(btn => {
        btn.addEventListener('click', () => {
          const op = btn.getAttribute('data-mop');
          setMathOp(op);
        });
      });
    }
    if (mathTableRow) {
      mathTableRow.querySelectorAll('.math-table-btn[data-mtable]').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-mtable');
          setMathTable(val);
        });
      });
    }

    function renderThemeModal() {
      if (chkEduNeutralColor) {
        chkEduNeutralColor.checked = !!appData.eduNeutralColor;
      }
      if (pendingEduThemeIdx === null) {
        pendingEduThemeIdx = getDefaultEduThemeIdx();
      }
      updateMathGradeModalUI();
      const makeCards = (items, forEdu) => items.map(t => {
        const idx = SYMBOL_THEMES.indexOf(t);
        const isAct = forEdu ? (idx === pendingEduThemeIdx) : (idx === symbolThemeIdx);
        let subText = t.desc || '';
        if (t.isEdu) {
          const ep = appData.eduProgress && appData.eduProgress[t.id];
          const epSolved = ep ? Object.values(ep.progress || {}).reduce((a, b) => a + b, 0) : 0;
          const epLvl = ep ? Math.min(13, (ep.unlockedIdx || 0) + 1) : 1;
          subText = `Seviye ${epLvl}/13 · ${epSolved} çözüm`;
        }
        const sampleHtml = t.sample ? `<span class="tc-sample">${t.sample}</span>` : '';
        const toneCls = t.isEdu ? `tc-${t.id}` : '';
        return `<button type="button" class="theme-card ${toneCls} ${isAct ? 'active' : ''}" data-tidx="${idx}" data-isedu="${forEdu ? '1' : '0'}">
          <span class="tc-ic">${t.icon}</span>
          <span>
            <span class="tc-name">${t.name}</span>
            <span class="tc-sub">${subText}</span>
            ${sampleHtml}
          </span>
        </button>`;
      }).join('');

      if (eduThemeGrid) eduThemeGrid.innerHTML = makeCards(SYMBOL_THEMES.filter(t => t.isEdu), true);
      if (classicThemeGrid) classicThemeGrid.innerHTML = makeCards(SYMBOL_THEMES.filter(t => !t.isEdu), false);

      if (themeModal) {
        themeModal.querySelectorAll('.theme-card[data-tidx]').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-tidx'), 10) || 0;
            const isEduCard = btn.getAttribute('data-isedu') === '1';
            if (isEduCard) {
              // Eğitici kısımda sadece seçimi işaretle; Oyna butonuna basınca oyuna gir
              playClick();
              pendingEduThemeIdx = idx;
              renderThemeModal();
            } else {
              selectSymbolTheme(idx);
            }
          });
        });
      }
    }

    function openThemeModal() {
      pendingEduThemeIdx = getDefaultEduThemeIdx();
      renderThemeModal();
      setThemeModalTab(isEduThemeActive() ? 'edu' : 'classic');
      if (themeOverlay) themeOverlay.classList.add('show');
      if (themeModal) themeModal.classList.add('show');
    }

    function closeThemeModal() {
      if (themeOverlay) themeOverlay.classList.remove('show');
      if (themeModal) themeModal.classList.remove('show');
    }

    function selectSymbolTheme(idx, forceNew) {
      const prevIdx = symbolThemeIdx;
      const wasEdu = isEduThemeActive();
      saveCurrentThemePosition();
      symbolThemeIdx = Math.max(0, Math.min(SYMBOL_THEMES.length - 1, idx));
      appData.symbolTheme = symbolThemeIdx;
      loadCurrentThemePosition();
      playClick();
      saveAppData();
      updateSymbolThemeUI();
      closeThemeModal();
      const nowEdu = isEduThemeActive();
      if (nowEdu && dailyMode) {
        dailyMode = false;
        if (btnDaily) btnDaily.classList.remove('active');
      }
      if (typeof buildGradeButtons === 'function') buildGradeButtons();
      if (typeof buildLevelButtons === 'function') buildLevelButtons();
      if (forceNew || wasEdu || nowEdu) {
        if (forceNew || prevIdx !== symbolThemeIdx || (nowEdu && size > 6)) {
          newPuzzle();
        } else {
          if (nowEdu) prepareEduPairsForPuzzle(letters);
          render();
          updateStatus();
        }
      } else {
        render();
        updateStatus();
      }
    }

    if (chkEduNeutralColor) {
      chkEduNeutralColor.addEventListener('change', () => {
        appData.eduNeutralColor = chkEduNeutralColor.checked;
        saveAppData();
        render();
      });
    }
    if (btnEduPlay) {
      btnEduPlay.addEventListener('click', () => {
        const targetIdx = (pendingEduThemeIdx !== null && SYMBOL_THEMES[pendingEduThemeIdx] && SYMBOL_THEMES[pendingEduThemeIdx].isEdu)
          ? pendingEduThemeIdx
          : getDefaultEduThemeIdx();
        dailyMode = false;
        if (btnDaily) btnDaily.classList.remove('active');
        selectSymbolTheme(targetIdx, true);
      });
    }
    if (themeClose) themeClose.addEventListener('click', () => { playClick(); closeThemeModal(); });
    if (themeOverlay) themeOverlay.addEventListener('click', closeThemeModal);

    // Oyun her zaman Klasik ABC (Harf) ile başlar
    symbolThemeIdx = 0;
    loadCurrentThemePosition();
    updateSymbolThemeUI();
    if (btnOpenThemeModal) {
      btnOpenThemeModal.addEventListener('click', () => {
        playClick();
        openThemeModal();
      });
    }
    if (btnSymbolTheme) {
      btnSymbolTheme.addEventListener('click', () => {
        const classicList = SYMBOL_THEMES.filter(t => !t.isEdu);
        const curTheme = getActiveSymbolTheme();
        const curClassicPos = classicList.indexOf(curTheme);
        const nextClassic = classicList[(curClassicPos + 1) % classicList.length] || SYMBOL_THEMES[0];
        const nextIdx = SYMBOL_THEMES.indexOf(nextClassic);
        selectSymbolTheme(nextIdx >= 0 ? nextIdx : 0);
      });
    }

    // Tema ve Renk Körlüğü Desen Ayarı
    if (appData.dark) {
      document.body.classList.add('dark-theme');
      btnTheme.textContent = '☀️';
    }
    patternMode = !!appData.pattern;
    btnPattern.style.background = patternMode ? 'rgba(255,255,255,0.42)' : '';
    soundEnabled = appData.sound;
    btnSound.textContent = soundEnabled ? '🔊' : '🔇';

    btnPattern.addEventListener('click', () => {
      patternMode = !patternMode;
      appData.pattern = patternMode;
      btnPattern.style.background = patternMode ? 'rgba(255,255,255,0.42)' : '';
      playClick();
      saveAppData();
      render();
    });

    btnSound.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      appData.sound = soundEnabled;
      btnSound.textContent = soundEnabled ? '🔊' : '🔇';
      saveAppData();
    });

    btnTheme.addEventListener('click', () => {
      appData.dark = !appData.dark;
      document.body.classList.toggle('dark-theme', appData.dark);
      btnTheme.textContent = appData.dark ? '☀️' : '🌙';
      saveAppData();
      render();
    });

    // İlk Giriş Kontrolü
    if (appData.firstTime) {
      tutorialModal.style.display = 'flex';
    }
    document.getElementById('btnStartTutorial').addEventListener('click', () => {
      appData.firstTime = false;
      saveAppData();
      tutorialModal.style.display = 'none';
    });

    /* Yardımcılar ve Hamle Geçmişi (Undo için) */
    function serializePaths(pObj) {
      return letters.map(l => l + ':' + (pObj[l] || []).map(pt => pt[0] + ',' + pt[1]).join(';')).join('|');
    }

    function saveHistoryState() {
      // paths derin kopyası
      const copy = {};
      for (const l of letters) {
        copy[l] = paths[l].map(pt => [...pt]);
      }
      if (historyStack.length > 0) {
        const last = historyStack[historyStack.length - 1];
        if (serializePaths(last) === serializePaths(copy)) return;
      }
      historyStack.push(copy);
      if (historyStack.length > 20) historyStack.shift();
    }

    function key(r, c) { return r + ',' + c; }
    function isAdjacent(r1, c1, r2, c2) {
      return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
    }
    function isObstacle(r, c) {
      return obstacles.some(([or, oc]) => or === r && oc === c);
    }
    function getEndpointLetter(r, c) {
      for (const letter of letters) {
        for (const [er, ec] of endpoints[letter]) {
          if (er === r && ec === c) return letter;
        }
      }
      return null;
    }
    function isPathComplete(letter, customPaths) {
      const pMap = customPaths || paths;
      const path = pMap[letter];
      if (!path || path.length < 2) return false;
      const first = path[0];
      const last = path[path.length - 1];
      const epFirst = getEndpointLetter(first[0], first[1]);
      const epLast = getEndpointLetter(last[0], last[1]);
      return epFirst === letter && epLast === letter && (first[0] !== last[0] || first[1] !== last[1]);
    }
    function countCoordTurns(path) {
      let turns = 0;
      for (let i = 2; i < path.length; i++) {
        const dr1 = path[i - 1][0] - path[i - 2][0];
        const dc1 = path[i - 1][1] - path[i - 2][1];
        const dr2 = path[i][0] - path[i - 1][0];
        const dc2 = path[i][1] - path[i - 1][1];
        if (dr1 !== dr2 || dc1 !== dc2) turns++;
      }
      return turns;
    }
    function getCellOwner(r, c, customPaths) {
      const ep = getEndpointLetter(r, c);
      if (ep) return ep;
      const pMap = customPaths || paths;
      for (const letter of letters) {
        for (const [pr, pc] of pMap[letter]) {
          if (pr === r && pc === c) return letter;
        }
      }
      return null;
    }
    function countFilledCells(customPaths) {
      const pMap = customPaths || paths;
      const set = new Set();
      for (const letter of letters) {
        for (const [r, c] of (pMap[letter] || [])) {
          set.add(key(r, c));
        }
      }
      return set.size;
    }
    function totalUsableCells() {
      return size * size - obstacles.length;
    }
    function nodeXY(r, c) { return { x: pad + c * cellGap, y: pad + r * cellGap }; }
    function levelCfg() { return GRADES[gradeIdx].levels[levelIdx]; }
    
    function rebuildPaths() {
      const hasAnyPath = letters.some(l => paths[l] && paths[l].length > 0);
      if (hasAnyPath) saveHistoryState();
      paths = {};
      letters.forEach(l => { paths[l] = []; });
    }

    function clearOtherPathsFromCell(r, c, exceptLetter, customPaths) {
      const pMap = customPaths || paths;
      for (const letter of letters) {
        if (letter === exceptLetter) continue;
        const idx = pMap[letter].findIndex(([pr, pc]) => pr === r && pc === c);
        if (idx !== -1) {
          pMap[letter] = idx <= 1 ? [] : pMap[letter].slice(0, idx);
        }
      }
    }

    /* Seçiciler */
    function buildGradeButtons() {
      gradeButtonsEl.innerHTML = '';
      GRADES.forEach((g, i) => {
        const unlocked = isGradeUnlocked(i);
        const allCrowns = g.levels.every((_, li) => hasGoldCrown(i, li));
        const btn = document.createElement('button');
        btn.className = 'chip'
          + (i === gradeIdx ? ' active' : '')
          + (!unlocked ? ' locked' : '')
          + (allCrowns ? ' gold-crown' : '');
        const lockIcon = !unlocked ? '🔒 ' : (allCrowns ? '👑 ' : '');
        const subText = !unlocked
          ? 'Kilitli'
          : `${gradeSolved(i)} çözüm`;
        btn.innerHTML = `${lockIcon}${g.label}<span class="sub">${subText}</span>`;
        btn.addEventListener('click', () => {
          if (!isGradeUnlocked(i)) {
            playError();
            showToast('error', '🔒', 'Zorluk Kilitli',
              `"${g.label}" kademesini açmak için önce önceki zorluk kademesinin seviyelerini tamamla!`);
            return;
          }
          if (i === gradeIdx) return;
          playClick();
          gradeIdx = i;
          // Bu zorlukta açık olan en son seviyeyi seç
          let highestOpen = 0;
          for (let li = 0; li < 5; li++) {
            if (isLevelUnlocked(i, li)) highestOpen = li;
          }
          levelIdx = highestOpen;
          saveCurrentThemePosition();
          saveAppData();
          dailyMode = false;
          if (btnDaily) btnDaily.classList.remove('active');
          buildGradeButtons();
          buildLevelButtons();
          newPuzzle();
        });
        gradeButtonsEl.appendChild(btn);
      });
    }

    function buildLevelButtons() {
      levelButtonsEl.innerHTML = '';
      const req = requiredForLevel(gradeIdx);
      GRADES[gradeIdx].levels.forEach((lvl, i) => {
        const unlocked = isLevelUnlocked(gradeIdx, i);
        const curProg = Math.min(req, tourSolvedCount(gradeIdx, i));
        const isDone = curProg >= req;
        const crown = hasGoldCrown(gradeIdx, i);
        const btn = document.createElement('button');
        btn.className = 'chip'
          + (i === levelIdx ? ' active' : '')
          + (!unlocked ? ' locked' : '')
          + (crown ? ' gold-crown' : (isDone ? ' done-level' : ''));
        const v = variantFor(gradeIdx, i, solvedCount(gradeIdx, i));
        const prefix = !unlocked ? '🔒 ' : (crown ? '👑 ' : (isDone ? '✓ ' : ''));
        const progLabel = !unlocked ? 'Kilitli' : `${curProg}/${req} · ${v.size}×${v.size}`;
        btn.innerHTML = `${prefix}Seviye ${lvl.level}` +
          `<span class="sub">${progLabel}</span>`;
        btn.addEventListener('click', () => {
          if (!isLevelUnlocked(gradeIdx, i)) {
            playError();
            showToast('error', '🔒', 'Seviye Kilitli',
              `Seviye ${lvl.level} kilidini açmak için önce Seviye ${i} hedefini (${req} bulmaca) tamamla!`);
            return;
          }
          if (i === levelIdx) return;
          playClick();
          levelIdx = i;
          saveCurrentThemePosition();
          saveAppData();
          dailyMode = false;
          if (btnDaily) btnDaily.classList.remove('active');
          buildLevelButtons();
          newPuzzle();
        });
        levelButtonsEl.appendChild(btn);
      });
    }

    function calcSmartMemorySeconds() {
      // Harf çifti sayısına ve ızgara boyutuna göre pedagojik akıllı ezberleme süresi (5 sn – 11 sn)
      return Math.min(12, Math.max(5, letters.length * 2 + (size >= 6 ? 1 : 0)));
    }

    function updateMemoryBannerUI() {
      const banner = document.getElementById('memoryBanner');
      const statusTxt = document.getElementById('memoryStatusText');
      const btnReady = document.getElementById('btnMemoryReady');
      const btnPeek = document.getElementById('btnMemoryPeek');
      const btnColor = document.getElementById('btnMemoryColorHint');
      const fillEl = document.getElementById('memoryProgressFill');
      if (!banner) return;

      banner.classList.toggle('show', memoryMode);
      if (!memoryMode) return;

      const memCfg = getMemoryGradeConfig(gradeIdx);

      if (btnColor) {
        btnColor.textContent = memoryColorHint ? '🌈 Renk İpucu: Açık' : '🌈 Renk İpucu: Kapalı';
        btnColor.style.opacity = memoryColorHint ? '1' : '0.68';
      }
      if (btnPeek) {
        btnPeek.textContent = `🔦 Fenerle Göz At (${memoryPeeksLeft})`;
        btnPeek.disabled = !memoryHidden || memoryPeeksLeft <= 0;
      }
      if (btnReady) {
        btnReady.style.display = memoryHidden ? 'none' : 'inline-flex';
      }
      if (statusTxt) {
        if (!memoryHidden) {
          statusTxt.innerHTML = `🧠 <strong>${memCfg.tierName}</strong> · ⏱️ Ezberleme Süresi: <strong>${memoryCountdown} sn</strong>`;
        } else if (memCfg.halfHide) {
          statusTxt.innerHTML = `🧠 <strong>${memCfg.tierName}:</strong> Başlangıç harfleri açık! Eşinin yerini hatırlayıp❓kutusuna bağla.`;
        } else {
          statusTxt.innerHTML = `🧠 <strong>${memCfg.tierName}:</strong> Dokunduğun harf açılır! Yanlış kutuya değersen 1 sn görünüp kapanır.`;
        }
      }
      if (fillEl) {
        const pct = memoryHidden ? 0 : Math.max(0, Math.min(100, (memoryCountdown / Math.max(1, memoryTotalSec)) * 100));
        fillEl.style.width = pct + '%';
      }
    }

    function startMemoryCountdown(customSeconds) {
      clearInterval(memoryTimer);
      clearTimeout(memoryPeekTimeout);
      tempRevealedLetter = null;
      if (!memoryMode) {
        memoryHidden = false;
        updateMemoryBannerUI();
        return;
      }
      const memCfg = getMemoryGradeConfig(gradeIdx);
      memoryHidden = false;
      memoryPeeksLeft = memCfg.peeks;
      memoryColorHint = memCfg.defaultColorHint;
      memoryTotalSec = customSeconds || memCfg.seconds;
      memoryCountdown = memoryTotalSec;
      updateSymbolTexts();
      render();
      updateMemoryBannerUI();
      noteEl.className = 'note teach';
      noteEl.textContent = memCfg.halfHide
        ? `🧠 ${memCfg.tierName}: Her harfin 1 ucu açık kalacak, sadece diğer ucun yerini aklında tut!`
        : `🧠 ${memCfg.tierName}: ${letters.length} çift harfin yerini ezberle! Hazırsan "🙈 Hazırım, Hemen Gizle!" butonuna basabilirsin.`;

      memoryTimer = setInterval(() => {
        if (!memoryMode) {
          clearInterval(memoryTimer);
          updateMemoryBannerUI();
          return;
        }
        memoryCountdown--;
        updateMemoryBannerUI();
        if (memoryCountdown > 0) {
          if (memoryCountdown <= 2) playTone(587.33, 0, 0.05, 'sine', 0.05);
        } else {
          clearInterval(memoryTimer);
          memoryHidden = true;
          updateSymbolTexts();
          render();
          updateMemoryBannerUI();
          noteEl.className = 'note';
          noteEl.textContent = memCfg.halfHide
            ? '🧠 Yarı-Hafıza Başladı! Açık harflerden tutup gizli (?) eşine sürükle!'
            : '🧠 Harfler gizlendi! Bir kutuya dokunup eşine sürükle; unutursan yukarıdaki "🔦 Fenerle Göz At" butonunu kullan!';
        }
      }, 1000);
    }

    function applyPuzzle(puzzle) {
      size = puzzle.s;
      puzzleScore = puzzle.score;
      currentSeedCode = puzzle.code || 1000;
      if (seedBtnLabel) seedBtnLabel.textContent = `Kod: #${currentSeedCode}`;
      letters = LETTERS.slice(0, puzzle.sol.length).split('');
      obstacles = (puzzle.obstacles || []).map(idx => [Math.floor(idx / size), idx % size]);

      endpoints = {};
      solution = {};
      puzzle.sol.forEach((cells, i) => {
        const letter = letters[i];
        const coords = cells.map(idx => [Math.floor(idx / size), idx % size]);
        solution[letter] = coords;
        endpoints[letter] = [coords[0], coords[coords.length - 1]];
      });
      prepareEduPairsForPuzzle(letters);

      paths = {};
      hintStageByLetter = {};
      letters.forEach(l => {
        paths[l] = [];
        hintStageByLetter[l] = 0;
      });
      historyStack = [];
      activeLetter = null;
      tapLetter = null;
      isDrawing = false;
      lastCell = null;
      hintsUsed = 0;
      hintArmed = false;
      puzzleSolved = false;
      puzzleStartTime = Date.now();
      undoOrClearUsed = false;

      resizeBoard();
      updateHintUI();
      updateStatus();
      updateStatsUI();
      render();
      if (memoryMode) startMemoryCountdown();
      if (typeof onPedagogicalPuzzleStart === 'function') onPedagogicalPuzzleStart();
    }

    function dailySeedCode() {
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth() + 1;
      const d = now.getDate();
      return 1000 + ((y * 372 + m * 31 + d + gradeIdx * 19 + levelIdx * 7) % 9000);
    }

    function newPuzzle(customSeedCode) {
      // Turnuva dışı bir soru açılırsa (seviye/mod değişimi) turnuva modundan güvenle çık
      if (tournamentMode && typeof stopTournamentMode === 'function') stopTournamentMode();
      const solved = solvedCount(gradeIdx, levelIdx);
      const v = variantFor(gradeIdx, levelIdx, solved);
      const eduActive = isEduThemeActive();
      const useSize = eduActive ? Math.min(v.size, 6) : v.size;
      const usePairs = eduActive ? Math.min(v.pairs, 6) : v.pairs;
      const p = percentileFor(gradeIdx, levelIdx, solved);
      const seedCode = customSeedCode || (dailyMode ? dailySeedCode() : null);
      const puzzle = generatePuzzle(useSize, usePairs, p, seedCode ? null : pendingFloor, 90, {
        seedCode,
        gi: gradeIdx,
        li: levelIdx,
        withObstacles: obstacleMode
      });
      pendingFloor = null;
      if (!puzzle) {
        showToast('error', '!', 'Üretilemedi', 'Bu seviye için bulmaca üretilemedi.');
        return;
      }
      applyPuzzle(puzzle);
    }

    function resizeBoard() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMainFs = document.body.classList.contains('main-fullscreen-mode') || !!document.fullscreenElement;
      if (isMainFs) {
        const fsCap = vw >= 860
          ? Math.min(Math.floor(vw * 0.56), Math.floor(vh * 0.68), 720)
          : Math.min(vw - 26, Math.floor(vh * 0.60), 560);
        const maxW = Math.min(vw - 26, fsCap);
        cellGap = Math.floor(maxW / (size - 1 + 0.5));
        if (size >= 10) cellGap = Math.max(26, Math.min(cellGap, 62));
        else if (size >= 9) cellGap = Math.max(28, Math.min(cellGap, 66));
        else if (size >= 8) cellGap = Math.max(30, Math.min(cellGap, 70));
        else if (size >= 7) cellGap = Math.max(34, Math.min(cellGap, 76));
        else if (size >= 6) cellGap = Math.max(38, Math.min(cellGap, 84));
        else if (size >= 5) cellGap = Math.max(42, Math.min(cellGap, 92));
        else cellGap = Math.max(46, Math.min(cellGap, 104));
        pad = Math.round(cellGap * 0.32);
        return;
      }
      const singleCap = vw >= 1100 ? Math.min(490, Math.floor(vh * 0.56)) : (vw >= 768 ? 450 : 420);
      const maxW = Math.min(vw - 44, singleCap);
      cellGap = Math.floor(maxW / (size - 1 + 0.5));
      if (size >= 10) cellGap = Math.max(24, Math.min(cellGap, 44));
      else if (size >= 9) cellGap = Math.max(26, Math.min(cellGap, 46));
      else if (size >= 8) cellGap = Math.max(28, Math.min(cellGap, 48));
      else if (size >= 7) cellGap = Math.max(30, Math.min(cellGap, 52));
      else if (size >= 6) cellGap = Math.max(34, Math.min(cellGap, 58));
      else if (size >= 5) cellGap = Math.max(38, Math.min(cellGap, 64));
      else cellGap = Math.max(42, Math.min(cellGap, 72));
      pad = Math.round(cellGap * 0.32);
    }

    function updateStatus() {
      const cfg = levelCfg();
      const solved = solvedCount(gradeIdx, levelIdx);
      const req = requiredForLevel(gradeIdx);
      const curProg = Math.min(req, tourSolvedCount(gradeIdx, levelIdx));
      const p = percentileFor(gradeIdx, levelIdx, solved);
      const stars = Math.max(1, Math.min(5, Math.round(p * 5)));
      const bar = '●'.repeat(stars) + '○'.repeat(5 - stars);
      const filled = countFilledCells();
      const total = totalUsableCells();
      const goldTourActive = (appData.goldTour || 0) > 0;
      const targetSec = goldTargetSec(gradeIdx, levelIdx);

      const activeTheme = getActiveSymbolTheme();
      const mathTag = (activeTheme && (activeTheme.isMath || activeTheme.usesGrade))
        ? `<button type="button" class="tag math-grade-tag" id="btnStatusMathGrade" title="Sınıf seviyesini değiştir">🏫 ${getMathGrade()}. Sınıf (${activeTheme.isMath ? getMathOpBadgeLabel() : activeTheme.name})</button>`
        : '';

      statusEl.innerHTML =
        `<span class="tag"><strong>${GRADES[gradeIdx].label}</strong> · Seviye ${cfg.level}</span>` +
        `<span class="tag">${size}×${size} · Nokta: <strong>${filled}/${total}</strong></span>` +
        `<span class="tag solved">Seviye Hedefi: <strong>${curProg}/${req}</strong></span>` +
        mathTag +
        (goldTourActive
          ? `<span class="tag diff">👑 Hedef Süre: <strong>≤${targetSec}sn</strong></span>`
          : `<span class="tag diff">Zorluk ${bar}</span>`);

      const btnStatusMathGrade = document.getElementById('btnStatusMathGrade');
      if (btnStatusMathGrade) {
        btnStatusMathGrade.addEventListener('click', () => {
          playClick();
          openThemeModal();
        });
      }

      if (gradeIdx === 0 && levelIdx === 0 && solved === 0 && hintsUsed === 0) {
        noteEl.className = 'note teach';
        noteEl.textContent = `Bir harfe dokun ve aynı harfe sürükle. Bu seviyede ${req} bulmaca çözünce otomatik olarak 2. Seviye açılacak!`;
      } else if (!hintArmed && hintsUsed === 0) {
        noteEl.className = 'note';
        noteEl.textContent = dailyMode
          ? `📅 Günün Sorusu (#${currentSeedCode}) · 2 kademeli ipucu hakkın var.`
          : (goldTourActive
              ? `🌟 Altın Yıldız Turu: Bu seviyeyi ≤${targetSec} saniyede ve ipucu kullanmadan ${req} kez çözerek 👑 Altın Taç kazan!`
              : `Bu seviyeyi geçmek için ${req} bulmaca çözmelisin (İlerleme: ${curProg}/${req}).`);
      }
    }

    /* Çizim ve SVG İşlemleri */
    const SVG_NS = 'http://www.w3.org/2000/svg';
    let polyByLetter = {};
    let energyPolyByLetter = {};
    let textElsByLetter = {};
    let haloEls = [];
    let doneHaloByLetter = {};
    let errorHaloGroup = null;
    let headMarker = null;

    function svgEl(name, attrs) {
      const el = document.createElementNS(SVG_NS, name);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    }

    function updateSymbolTexts() {
      letters.forEach(letter => {
        (textElsByLetter[letter] || []).forEach((tEl, epIdx) => {
          tEl.textContent = getSymbol(letter, false, epIdx);
        });
      });
    }

    function render() {
      const W = pad * 2 + (size - 1) * cellGap;
      boardSvg.setAttribute('width', W);
      boardSvg.setAttribute('height', W);
      boardSvg.setAttribute('viewBox', `0 0 ${W} ${W}`);
      boardSvg.innerHTML = '';

      const strokeW = Math.max(5, cellGap * 0.3);
      const dotR = Math.max(2.6, cellGap * 0.075);
      const isEmoji = symbolThemeIdx >= 1 && symbolThemeIdx <= 3;
      const fontSize = Math.round(cellGap * (isEmoji ? (size >= 8 ? 0.44 : 0.48) : (size >= 8 ? 0.5 : 0.54)));

      polyByLetter = {};
      energyPolyByLetter = {};
      const pathGroup = svgEl('g');
      letters.forEach(letter => {
        const attrs = {
          class: 'path-line',
          points: '',
          stroke: PATH_COLORS[letter],
          'stroke-width': strokeW
        };
        if (patternMode && PATH_DASHES[letter]) {
          attrs['stroke-dasharray'] = PATH_DASHES[letter];
        }
        const poly = svgEl('polyline', attrs);
        polyByLetter[letter] = poly;
        pathGroup.appendChild(poly);

        const energyPoly = svgEl('polyline', {
          class: 'energy-line',
          points: '',
          'stroke-width': Math.max(2.2, strokeW * 0.32)
        });
        energyPolyByLetter[letter] = energyPoly;
        pathGroup.appendChild(energyPoly);
      });
      boardSvg.appendChild(pathGroup);

      headMarker = svgEl('circle', {
        r: strokeW * 0.62,
        fill: 'none',
        opacity: '0'
      });
      boardSvg.appendChild(headMarker);

      const dotGroup = svgEl('g');
      const obsSize = cellGap * 0.56;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const { x, y } = nodeXY(r, c);
          if (isObstacle(r, c)) {
            dotGroup.appendChild(svgEl('rect', {
              class: 'obstacle-cell',
              x: x - obsSize / 2,
              y: y - obsSize / 2,
              width: obsSize,
              height: obsSize,
              rx: Math.max(4, obsSize * 0.22)
            }));
            continue;
          }
          if (getEndpointLetter(r, c)) continue;
          dotGroup.appendChild(svgEl('circle', { class: 'node-dot', cx: x, cy: y, r: dotR }));
        }
      }
      boardSvg.appendChild(dotGroup);

      errorHaloGroup = svgEl('g');
      boardSvg.appendChild(errorHaloGroup);

      haloEls = [];
      doneHaloByLetter = {};
      textElsByLetter = {};
      const letterGroup = svgEl('g');
      const eduMode = isEduThemeActive();
      let maxEduLen = 2;
      if (eduMode) {
        letters.forEach(l => {
          if (activeEduPairs[l]) {
            maxEduLen = Math.max(maxEduLen, activeEduPairs[l][0].length, activeEduPairs[l][1].length);
          }
        });
      }
      const eduFactor = maxEduLen <= 2 ? 0.30 : (maxEduLen <= 4 ? 0.23 : (maxEduLen <= 6 ? 0.175 : (maxEduLen <= 7 ? 0.15 : 0.13)));
      const eduUniformFontSize = Math.max(8, Math.round(cellGap * eduFactor));

      letters.forEach(letter => {
        doneHaloByLetter[letter] = [];
        textElsByLetter[letter] = [];
        endpoints[letter].forEach(([r, c], epIdx) => {
          const { x, y } = nodeXY(r, c);
          const symText = getSymbol(letter, false, epIdx);
          const neutralEdu = eduMode && !!appData.eduNeutralColor;
          const badgeStroke = neutralEdu ? '#3949ab' : PATH_COLORS[letter];

          const circleR = cellGap * (eduMode ? 0.43 : 0.35);
          let eduPillW = 0;
          if (eduMode) {
            const pillH = cellGap * 0.40;
            const safeR = Math.max(4, circleR - 2.5);
            const maxInscribedW = 2 * Math.sqrt(Math.max(1, safeR * safeR - (pillH / 2) * (pillH / 2)));
            eduPillW = Math.min(maxInscribedW, Math.max(cellGap * 0.52, maxEduLen * cellGap * 0.13 + 8));
            letterGroup.appendChild(svgEl('rect', {
              class: 'edu-pill-rect',
              x: x - eduPillW / 2,
              y: y - pillH / 2,
              width: eduPillW,
              height: pillH,
              rx: Math.min(9, pillH * 0.36),
              stroke: badgeStroke
            }));
          } else if (patternMode || (memoryMode && memoryHidden && memoryColorHint)) {
            letterGroup.appendChild(svgEl('circle', {
              class: 'letter-badge',
              cx: x, cy: y,
              r: cellGap * 0.33,
              fill: PATH_COLORS[letter],
              opacity: (memoryMode && memoryHidden && memoryColorHint) ? '0.28' : '0.22'
            }));
          }
          const doneHalo = svgEl('circle', {
            class: 'done-halo',
            cx: x, cy: y,
            r: circleR,
            stroke: PATH_COLORS[letter]
          });
          doneHaloByLetter[letter].push(doneHalo);
          letterGroup.appendChild(doneHalo);

          const halo = svgEl('circle', {
            class: 'hint-halo', cx: x, cy: y, r: cellGap * (eduMode ? 0.44 : 0.36), opacity: '0'
          });
          haloEls.push(halo);
          letterGroup.appendChild(halo);

          const symFontSize = (eduMode && symText !== '?') ? eduUniformFontSize : fontSize;
          const textAttrs = { class: 'node-letter', x, y, 'font-size': symFontSize };
          if (eduMode && eduPillW > 0 && symText !== '?' && (symText.length * symFontSize * 0.62) > (eduPillW - 6)) {
            textAttrs.textLength = Math.max(10, Math.round(eduPillW - 6));
            textAttrs.lengthAdjust = 'spacingAndGlyphs';
          }
          const text = svgEl('text', textAttrs);
          text.textContent = symText;
          textElsByLetter[letter].push(text);
          letterGroup.appendChild(text);
        });
      });
      boardSvg.appendChild(letterGroup);

      updatePaths();
      updateHalos();
      maybeStartHandTutorial(strokeW);
    }

    let _handTutRaf = null;
    function stopHandTutorial() {
      if (_handTutRaf) {
        cancelAnimationFrame(_handTutRaf);
        _handTutRaf = null;
      }
      const old = document.getElementById('tutGuideLayer');
      if (old && old.parentNode) old.parentNode.removeChild(old);
    }

    function maybeStartHandTutorial(strokeW) {
      stopHandTutorial();
      if (appData.tutorialSeen) return;
      if (gradeIdx !== 0 || levelIdx !== 0 || solvedCount(0, 0) > 0) return;
      if (memoryMode || rushMode || dailyMode) return;
      if (!solution || !Array.isArray(solution['A']) || solution['A'].length < 2) return;
      if (Object.values(paths || {}).some(p => p && p.length >= 2)) return;

      const ptsArr = solution['A'].map(([r, c]) => nodeXY(r, c));
      const ptsStr = ptsArr.map(p => `${p.x},${p.y}`).join(' ');
      const g = svgEl('g', { id: 'tutGuideLayer', style: 'pointer-events:none;' });
      const guideLine = svgEl('polyline', {
        points: ptsStr,
        fill: 'none',
        stroke: PATH_COLORS['A'] || '#e65100',
        'stroke-width': Math.max(4, (strokeW || 12) * 0.44),
        'stroke-dasharray': '7,7',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        opacity: '0.42'
      });
      const startPulse = svgEl('circle', {
        cx: ptsArr[0].x,
        cy: ptsArr[0].y,
        r: Math.max(16, Math.round(cellGap * 0.34)),
        fill: 'none',
        stroke: PATH_COLORS['A'] || '#e65100',
        'stroke-width': 3,
        class: 'tut-pulse-ring'
      });
      const handEl = svgEl('text', {
        x: ptsArr[0].x,
        y: ptsArr[0].y + cellGap * 0.12,
        'font-size': Math.max(18, Math.round(cellGap * 0.34)),
        'text-anchor': 'middle',
        'dominant-baseline': 'central'
      });
      handEl.textContent = '👆';
      g.appendChild(guideLine);
      g.appendChild(startPulse);
      g.appendChild(handEl);
      boardSvg.appendChild(g);

      const segs = [];
      let totalLen = 0;
      for (let i = 0; i < ptsArr.length - 1; i++) {
        const dx = ptsArr[i + 1].x - ptsArr[i].x;
        const dy = ptsArr[i + 1].y - ptsArr[i].y;
        const d = Math.hypot(dx, dy);
        segs.push({ from: ptsArr[i], to: ptsArr[i + 1], len: d });
        totalLen += d;
      }
      if (totalLen <= 0) return;

      const tStart = performance.now();
      const loopMs = 2400;
      function tick(now) {
        if (!document.getElementById('tutGuideLayer')) return;
        const phase = ((now - tStart) % loopMs) / loopMs; // 0..1
        // 0..0.15 başlangıçta bekle, 0.15..0.85 çizgi boyunca kay, 0.85..1.0 bitişte bekle
        const prog = phase < 0.15 ? 0 : (phase > 0.85 ? 1 : (phase - 0.15) / 0.70);
        let dist = prog * totalLen;
        let cx = ptsArr[0].x, cy = ptsArr[0].y;
        for (let i = 0; i < segs.length; i++) {
          if (dist <= segs[i].len || i === segs.length - 1) {
            const ratio = segs[i].len > 0 ? Math.min(1, Math.max(0, dist / segs[i].len)) : 0;
            cx = segs[i].from.x + (segs[i].to.x - segs[i].from.x) * ratio;
            cy = segs[i].from.y + (segs[i].to.y - segs[i].from.y) * ratio;
            break;
          }
          dist -= segs[i].len;
        }
        handEl.setAttribute('x', cx.toFixed(1));
        handEl.setAttribute('y', (cy + cellGap * 0.12).toFixed(1));
        handEl.setAttribute('opacity', phase > 0.90 ? '0.55' : '0.95');
        _handTutRaf = requestAnimationFrame(tick);
      }
      _handTutRaf = requestAnimationFrame(tick);
    }

    function highlightEmptyCells() {
      if (!errorHaloGroup) return;
      errorHaloGroup.innerHTML = '';
      const occupied = new Set();
      for (const letter of letters) {
        for (const [r, c] of paths[letter]) occupied.add(key(r, c));
      }
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (isObstacle(r, c)) continue;
          if (!occupied.has(key(r, c))) {
            const { x, y } = nodeXY(r, c);
            errorHaloGroup.appendChild(svgEl('circle', {
              class: 'error-halo',
              cx: x, cy: y,
              r: cellGap * 0.28
            }));
          }
        }
      }
      setTimeout(() => {
        if (errorHaloGroup) errorHaloGroup.innerHTML = '';
      }, 2200);
    }

    function updatePaths() {
      const prevDone = window._eduDoneLetters || (window._eduDoneLetters = new Set());
      const curDone = new Set();
      let newlyDoneLetter = null;
      letters.forEach(letter => {
        const poly = polyByLetter[letter];
        const ePoly = energyPolyByLetter[letter];
        if (!poly) return;
        const path = paths[letter];
        let pts = '';
        if (path && path.length >= 2) {
          for (let i = 0; i < path.length; i++) {
            const p = nodeXY(path[i][0], path[i][1]);
            pts += (i ? ' ' : '') + p.x + ',' + p.y;
          }
        }
        poly.setAttribute('points', pts);
        const done = isPathComplete(letter);
        if (done) {
          curDone.add(letter);
          if (!prevDone.has(letter)) newlyDoneLetter = letter;
        }
        if (ePoly) {
          ePoly.setAttribute('points', done ? pts : '');
          ePoly.classList.toggle('active', done);
        }
        (doneHaloByLetter[letter] || []).forEach(el => el.classList.toggle('show', done));
      });
      window._eduDoneLetters = curDone;
      if (Object.values(paths || {}).some(p => p && p.length >= 2)) {
        stopHandTutorial();
      }
      updateSymbolTexts();
      updateHead();
      updateStatus();
      if (newlyDoneLetter && isEduThemeActive() && noteEl && !puzzleSolved) {
        noteEl.className = 'note teach';
        noteEl.textContent = `✅ Doğru eşleşme: ${getSymbol(newlyDoneLetter, true)}`;
      }
    }

    function updateHead() {
      if (!headMarker) return;
      const letter = activeLetter || tapLetter;
      const path = letter ? paths[letter] : null;
      if (!letter || !path || !path.length) {
        headMarker.setAttribute('opacity', '0');
        return;
      }
      const [r, c] = path[path.length - 1];
      const { x, y } = nodeXY(r, c);
      headMarker.setAttribute('cx', x);
      headMarker.setAttribute('cy', y);
      headMarker.setAttribute('stroke', PATH_COLORS[letter]);
      headMarker.setAttribute('stroke-width', Math.max(2, cellGap * 0.06));
      headMarker.setAttribute('opacity', '0.9');
    }

    function updateHalos() {
      haloEls.forEach(el => el.setAttribute('opacity', hintArmed ? '1' : '0'));
    }

    function updateHintUI() {
      const remaining = MAX_HINTS - hintsUsed;
      btnHint.disabled = remaining <= 0;
      btnHint.classList.toggle('armed', hintArmed);
      btnHint.textContent = remaining <= 0
        ? 'İpucu bitti'
        : (hintArmed ? 'Bir harfe dokun' : `İpucu (${remaining})`);
      boardFrame.classList.toggle('hint-armed', hintArmed);
      if (hintArmed) {
        noteEl.className = 'note';
        noteEl.textContent = 'İpucu hazır: 1. dokunuşta başlangıç rotası, 2. dokunuşta tam yol çizilir.';
      }
    }

    function applyHint(letter) {
      const sol = solution[letter];
      if (!sol || hintsUsed >= MAX_HINTS) return;
      saveHistoryState();
      const stage = (hintStageByLetter[letter] || 0) + 1;
      hintStageByLetter[letter] = stage;
      const sliceLen = stage === 1 ? Math.max(2, Math.ceil(sol.length / 2)) : sol.length;
      const partial = sol.slice(0, sliceLen);

      partial.forEach(([r, c]) => clearOtherPathsFromCell(r, c, letter));
      paths[letter] = partial.map(([r, c]) => [r, c]);
      hintsUsed++;
      hintArmed = false;
      updateHintUI();
      noteEl.className = 'note';
      noteEl.textContent = stage === 1
        ? `💡 ${letter} harfinin başlangıç rotası (${sliceLen}/${sol.length} adım) çizildi! Devamını tamamla.`
        : `💡 ${letter} harfi eşiyle tamamen birleştirildi.`;
      playHint();
      updatePaths();
      updateHalos();
      scheduleAutoCheck();
    }

    btnHint.addEventListener('click', () => {
      if (hintsUsed >= MAX_HINTS) return;
      playClick();
      hintArmed = !hintArmed;
      updateHintUI();
      if (!hintArmed) updateStatus();
      updateHalos();
    });

    function buzz(ms) {
      try { if (navigator.vibrate) navigator.vibrate(ms); } catch (_) {}
    }

    function grabPath(letter, r, c) {
      saveHistoryState();
      activeLetter = letter;
      lastCell = [r, c];
      lastDir = null;
      const isEp = getEndpointLetter(r, c) === letter;
      const path = paths[letter];
      const idx = path.findIndex(([pr, pc]) => pr === r && pc === c);
      if (!isEp && idx !== -1) {
        paths[letter] = path.slice(0, idx + 1);
      } else {
        clearOtherPathsFromCell(r, c, letter);
        paths[letter] = [[r, c]];
      }
    }

    function startDraw(r, c) {
      if (isObstacle(r, c)) return false;
      const ep = getEndpointLetter(r, c);

      if (hintArmed) {
        if (ep) applyHint(ep);
        return false;
      }

      if (ep) {
        playClick();
        buzz(8);
        isDrawing = true;
        tapLetter = ep;
        grabPath(ep, r, c);
        updatePaths();
        return true;
      }

      const owner = getCellOwner(r, c);
      if (owner) {
        playClick();
        isDrawing = true;
        tapLetter = owner;
        grabPath(owner, r, c);
        updatePaths();
        return true;
      }
      return false;
    }

    function stepTo(r, c) {
      if (r < 0 || c < 0 || r >= size || c >= size) return false;
      if (isObstacle(r, c)) return false;
      if (!activeLetter || !lastCell) return false;
      if (lastCell[0] === r && lastCell[1] === c) return false;
      if (!isAdjacent(lastCell[0], lastCell[1], r, c)) return false;

      const path = paths[activeLetter];
      const existingIdx = path.findIndex(([pr, pc]) => pr === r && pc === c);

      if (existingIdx !== -1) {
        paths[activeLetter] = path.slice(0, existingIdx + 1);
        lastDir = [r - lastCell[0], c - lastCell[1]];
        lastCell = [r, c];
        playStepNote(paths[activeLetter].length);
        return true;
      }

      if (isPathComplete(activeLetter)) return false;

      const ep = getEndpointLetter(r, c);
      if (ep && ep !== activeLetter) {
        // Gelişmiş Hafıza Modu: Yanlış '?' kutusuna değdiğinde o harfi 1.1 saniyeliğine gösterip tekrar gizle (Kart Eşleştirme Mantığı!)
        if (memoryMode && memoryHidden) {
          clearTimeout(tempRevealTimeout);
          tempRevealedLetter = ep;
          updateSymbolTexts();
          playTone(392, 0, 0.09, 'triangle', 0.07);
          noteEl.className = 'note teach';
          noteEl.textContent = `👀 Orada "${getSymbol(ep, true)}" varmış! Yerini aklında tut!`;
          tempRevealTimeout = setTimeout(() => {
            tempRevealedLetter = null;
            updateSymbolTexts();
          }, 1150);
        }
        return false;
      }
      const owner = getCellOwner(r, c);
      if (owner && owner !== activeLetter) return false;

      paths[activeLetter].push([r, c]);
      lastDir = [r - lastCell[0], c - lastCell[1]];
      lastCell = [r, c];

      if (ep === activeLetter) {
        const start = paths[activeLetter][0];
        if (!(start[0] === r && start[1] === c)) {
          isDrawing = false;
          tapLetter = null;
          playPathComplete();
          buzz(14);
          return true;
        }
      }
      playStepNote(paths[activeLetter].length);
      return true;
    }

    function traceTo(tr, tc) {
      let changed = false;
      let guard = 0;
      const limit = size * size + 8;
      const maxBridge = Math.max(6, size + 2);

      if (lastCell && (Math.abs(tr - lastCell[0]) + Math.abs(tc - lastCell[1])) > maxBridge) {
        return false;
      }

      while (lastCell && guard++ < limit) {
        const [r, c] = lastCell;
        if (r === tr && c === tc) break;

        const dr = Math.sign(tr - r);
        const dc = Math.sign(tc - c);
        const order = Math.abs(tr - r) >= Math.abs(tc - c)
          ? [[dr, 0], [0, dc]]
          : [[0, dc], [dr, 0]];

        if (lastDir) {
          if (lastDir[0] && dr === lastDir[0]) order.unshift([dr, 0]);
          else if (lastDir[1] && dc === lastDir[1]) order.unshift([0, dc]);
        }

        let moved = false;
        for (const [sr, sc] of order) {
          if (!sr && !sc) continue;
          if (stepTo(r + sr, c + sc)) { moved = true; break; }
        }
        if (!moved) break;
        changed = true;
        if (!isDrawing) break;
      }

      return changed;
    }

    function scheduleAutoCheck() {
      if (puzzleSolved) return;
      clearTimeout(autoCheckTimer);
      if (countFilledCells() < totalUsableCells()) return;
      autoCheckTimer = setTimeout(() => {
        if (!puzzleSolved && !isDrawing && validate().valid) {
          triggerSingleWin();
        }
      }, 260);
    }

    function pauseStroke() {
      isDrawing = false;
      activeLetter = null;
      lastCell = null;
      lastDir = null;
      lastSvgPt = null;
      updateSymbolTexts();
      updateHead();
      scheduleAutoCheck();
    }

    function boardSizeSvg() {
      return pad * 2 + (size - 1) * cellGap;
    }

    function clientToSvg(clientX, clientY) {
      const rect = boardSvg.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const W = boardSizeSvg();
      return {
        x: ((clientX - rect.left) / rect.width) * W,
        y: ((clientY - rect.top) / rect.height) * W
      };
    }

    function nearestCellFromSvg(x, y, tolerance) {
      const W = boardSizeSvg();
      const margin = cellGap * 0.85;
      if (x < -margin || y < -margin || x > W + margin || y > W + margin) return null;

      let c = Math.round((x - pad) / cellGap);
      let r = Math.round((y - pad) / cellGap);
      c = Math.max(0, Math.min(size - 1, c));
      r = Math.max(0, Math.min(size - 1, r));
      const p = nodeXY(r, c);
      const dist2 = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (tolerance != null && dist2 > (cellGap * tolerance) ** 2) return null;
      return [r, c];
    }

    function nodeAt(clientX, clientY, tolerance) {
      const pt = clientToSvg(clientX, clientY);
      if (!pt) return null;
      return nearestCellFromSvg(pt.x, pt.y, tolerance);
    }

    function dragTargetFromSvg(x, y) {
      if (!lastCell) return nearestCellFromSvg(x, y, null);

      const [lr, lc] = lastCell;
      const candidates = [
        [lr, lc],
        [lr - 1, lc], [lr + 1, lc], [lr, lc - 1], [lr, lc + 1]
      ];

      let best = null;
      let bestD = Infinity;
      for (const [r, c] of candidates) {
        if (r < 0 || c < 0 || r >= size || c >= size) continue;
        const p = nodeXY(r, c);
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = [r, c];
        }
      }

      const nearest = nearestCellFromSvg(x, y, null);
      if (nearest) {
        const p = nodeXY(nearest[0], nearest[1]);
        const dn = (p.x - x) ** 2 + (p.y - y) ** 2;
        const man = Math.abs(nearest[0] - lr) + Math.abs(nearest[1] - lc);
        if (man > 1 && dn + (cellGap * 0.12) ** 2 < bestD) return nearest;
        if (man === 1 && dn < bestD) return nearest;
      }
      return best;
    }

    function sampleSvgSegment(x0, y0, x1, y1) {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const dist = Math.hypot(dx, dy);
      const step = Math.max(4, cellGap * 0.22);
      const n = Math.max(1, Math.ceil(dist / step));
      const out = [];
      for (let i = 1; i <= n; i++) {
        const t = i / n;
        out.push([x0 + dx * t, y0 + dy * t]);
      }
      return out;
    }

    let pointerId = null;
    let activeTouchId = null;
    let usingTouch = false;
    let pathsDirty = false;
    let frameQueued = false;

    function schedulePathPaint() {
      if (frameQueued) return;
      frameQueued = true;
      requestAnimationFrame(() => {
        frameQueued = false;
        if (pathsDirty) {
          pathsDirty = false;
          updatePaths();
        }
      });
    }

    function markPathsDirty() {
      pathsDirty = true;
      schedulePathPaint();
    }

    function processDragSvg(x, y) {
      if (!isDrawing || !lastCell) return;
      const samples = lastSvgPt
        ? sampleSvgSegment(lastSvgPt.x, lastSvgPt.y, x, y)
        : [[x, y]];
      lastSvgPt = { x, y };

      let changed = false;
      for (let i = 0; i < samples.length; i++) {
        const target = dragTargetFromSvg(samples[i][0], samples[i][1]);
        if (!target) continue;
        if (target[0] === lastCell[0] && target[1] === lastCell[1]) continue;
        if (traceTo(target[0], target[1])) changed = true;
        if (!isDrawing) break;
      }
      if (changed) markPathsDirty();
    }

    function processDragClient(clientX, clientY) {
      const pt = clientToSvg(clientX, clientY);
      if (!pt) return;
      processDragSvg(pt.x, pt.y);
    }

    function handleDown(r, c) {
      if (hintArmed) {
        const ep = getEndpointLetter(r, c);
        if (ep) applyHint(ep);
        return false;
      }

      if (tapLetter && !isPathComplete(tapLetter)) {
        const path = paths[tapLetter];
        if (path && path.length) {
          const head = path[path.length - 1];
          const ep = getEndpointLetter(r, c);
          if (isAdjacent(head[0], head[1], r, c) && (!ep || ep === tapLetter)) {
            saveHistoryState();
            activeLetter = tapLetter;
            lastCell = head;
            lastDir = null;
            isDrawing = true;
            if (stepTo(r, c)) {
              playClick();
              buzz(6);
              updatePaths();
            }
            return true;
          }
        }
      }

      return startDraw(r, c);
    }

    function beginAtClient(clientX, clientY) {
      lastSvgPt = clientToSvg(clientX, clientY);
      const pos = nodeAt(clientX, clientY, 0.92);
      if (!pos) {
        isDrawing = false;
        return false;
      }
      return handleDown(pos[0], pos[1]);
    }

    // Dokunmatik Eventler (Akıllı Tahta & Mobil Uyumlu)
    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      usingTouch = true;
      activeTouchId = t.identifier;
      pointerId = null;
      e.preventDefault();
      beginAtClient(t.clientX, t.clientY);
    }

    function onTouchMove(e) {
      if (!usingTouch || !isDrawing) return;
      let t = null;
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === activeTouchId) {
          t = e.touches[i];
          break;
        }
      }
      if (!t && e.touches.length) t = e.touches[0];
      if (!t) return;
      e.preventDefault();
      processDragClient(t.clientX, t.clientY);
    }

    function onTouchEnd(e) {
      if (!usingTouch) return;
      if (activeTouchId !== null) {
        for (let i = 0; i < e.touches.length; i++) {
          if (e.touches[i].identifier === activeTouchId) return;
        }
      }
      e.preventDefault();
      if (pathsDirty) {
        pathsDirty = false;
        updatePaths();
      }
      usingTouch = false;
      activeTouchId = null;
      pauseStroke();
    }

    function onTouchCancel() {
      if (!usingTouch) return;
      usingTouch = false;
      activeTouchId = null;
      pauseStroke();
    }

    boardFrame.addEventListener('touchstart', onTouchStart, { passive: false });
    boardFrame.addEventListener('touchmove', onTouchMove, { passive: false });
    boardFrame.addEventListener('touchend', onTouchEnd, { passive: false });
    boardFrame.addEventListener('touchcancel', onTouchCancel, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: false });
    document.addEventListener('touchcancel', onTouchCancel, { passive: false });

    // Pointer Eventleri (Bilgisayar & Akıllı Tahta Kalemi)
    function onPointerDown(e) {
      if (e.pointerType === 'touch') return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      usingTouch = false;
      activeTouchId = null;
      pointerId = e.pointerId;
      e.preventDefault();
      try { boardFrame.setPointerCapture(e.pointerId); } catch (_) {}
      beginAtClient(e.clientX, e.clientY);
    }

    function onPointerMove(e) {
      if (e.pointerType === 'touch') return;
      if (e.pointerId !== pointerId || !isDrawing) return;
      e.preventDefault();

      if (e.getCoalescedEvents) {
        const list = e.getCoalescedEvents();
        if (list && list.length) {
          for (const ev of list) processDragClient(ev.clientX, ev.clientY);
          return;
        }
      }
      processDragClient(e.clientX, e.clientY);
    }

    function onPointerUp(e) {
      if (e.pointerType === 'touch') return;
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      if (pathsDirty) {
        pathsDirty = false;
        updatePaths();
      }
      pauseStroke();
    }

    function onPointerCancel(e) {
      if (e.pointerType === 'touch') return;
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      pauseStroke();
    }

    boardFrame.addEventListener('pointerdown', onPointerDown);
    boardFrame.addEventListener('pointermove', onPointerMove);
    boardFrame.addEventListener('pointerup', onPointerUp);
    boardFrame.addEventListener('pointercancel', onPointerCancel);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('blur', () => {
      pointerId = null;
      usingTouch = false;
      activeTouchId = null;
      pauseStroke();
    });

    boardFrame.addEventListener('contextmenu', (e) => e.preventDefault());

    /* Doğrulama Motoru */
    function validate(customPaths) {
      const pMap = customPaths || paths;
      const issues = [];

      for (const letter of letters) {
        const eps = endpoints[letter];
        const path = pMap[letter] || [];
        if (path.length < 2) {
          issues.push(`${letter} harfi henüz bağlanmadı.`);
          continue;
        }
        const firstKey = key(path[0][0], path[0][1]);
        const lastKey = key(path[path.length - 1][0], path[path.length - 1][1]);
        const ep0Key = key(eps[0][0], eps[0][1]);
        const ep1Key = key(eps[1][0], eps[1][1]);
        const endsMatch = (firstKey === ep0Key && lastKey === ep1Key) ||
                          (firstKey === ep1Key && lastKey === ep0Key);
        if (!endsMatch) {
          issues.push(`${letter} harfinin iki ucu bağlı değil.`);
          continue;
        }
        for (let i = 1; i < path.length; i++) {
          if (!isAdjacent(path[i-1][0], path[i-1][1], path[i][0], path[i][1])) {
            issues.push(`${letter} yolunda çapraz veya kopukluk var.`);
            break;
          }
        }
      }

      const occupied = new Map();
      for (const letter of letters) {
        for (const [r, c] of (pMap[letter] || [])) {
          if (isObstacle(r, c)) {
            issues.push(`${letter} yolu engelin üzerinden geçmiş.`);
            break;
          }
          const k = key(r, c);
          if (occupied.has(k) && occupied.get(k) !== letter) {
            issues.push('Yollar birbirini kesiyor!');
            break;
          }
          occupied.set(k, letter);
        }
      }

      for (const letter of letters) {
        for (const [r, c] of (pMap[letter] || [])) {
          const ep = getEndpointLetter(r, c);
          if (ep && ep !== letter) {
            issues.push(`${letter} yolu ${ep} harfinin üzerinden geçmiş.`);
            break;
          }
        }
      }

      let empty = 0;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (isObstacle(r, c)) continue;
          if (!occupied.has(key(r, c))) empty++;
        }
      }
      if (empty > 0) issues.push(`Henüz ${empty} nokta açıkta. Tüm noktaları doldur!`);

      return { valid: issues.length === 0, issues, empty };
    }

    /* Bildirim ve Görsel Şölen */
    function showToast(type, icon, title, msg, opts = {}) {
      toast.className = 'toast show ' + type;
      toastIcon.textContent = icon;
      if (toastStars) {
        if (opts.stars) {
          toastStars.hidden = false;
          toastStars.textContent = '⭐'.repeat(opts.stars) + '☆'.repeat(3 - opts.stars);
        } else {
          toastStars.hidden = true;
        }
      }
      toastTitle.textContent = title;
      toastMsg.textContent = msg;
      toastNext.hidden = !opts.showNext;
      toastClose.hidden = !opts.showNext;
      overlay.classList.add('show');
      if (!opts.showNext) setTimeout(hideToast, opts.duration || 2600);
    }
    function hideToast() {
      toast.classList.remove('show');
      overlay.classList.remove('show');
    }

    function spawnConfetti() {
      confettiEl.innerHTML = '';
      const colors = Object.values(PATH_COLORS);
      for (let i = 0; i < 55; i++) {
        const p = document.createElement('div');
        p.className = 'confetti';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = colors[i % colors.length];
        p.style.animationDuration = (1.8 + Math.random() * 2) + 's';
        p.style.animationDelay = Math.random() * 0.4 + 's';
        confettiEl.appendChild(p);
      }
      setTimeout(() => { confettiEl.innerHTML = ''; }, 4200);
    }

    const PRAISE_EASY = ['Harikasın!', 'Süpersin!', 'Çok iyi!', 'Bravo!', 'Aferin!'];
    const PRAISE_HARD = ['Doğru çözüm!', 'Tebrikler!', 'Mükemmel mantık!', 'Çok iyi düşündün!'];

    function checkWinAchievements(elapsedSec) {
      const newlyUnlocked = [];
      const tryUnlock = (id) => {
        const b = unlockAchievement(id);
        if (b) newlyUnlocked.push(b);
      };
      tryUnlock('first_win');
      if (elapsedSec <= 15) tryUnlock('speed_15');
      if ((appData.noHintWins || 0) >= 10) tryUnlock('no_hint_10');
      if (streakCount >= 5) tryUnlock('streak_5');
      if ((appData.obstacleWins || 0) >= 5) tryUnlock('obstacle_5');
      if (memoryMode) tryUnlock('memory_win');
      if (rushMode && rushSolved >= 5) tryUnlock('rush_5');
      if (gradeIdx === 5) tryUnlock('expert_win');
      updateStatsUI();
      return newlyUnlocked;
    }

    function triggerSingleWin() {
      const prevGrade = gradeIdx;
      const prevLevel = levelIdx;
      const prevGradeLabel = GRADES[prevGrade].label;
      const prevLevelNum = GRADES[prevGrade].levels[prevLevel].level;
      const easy = prevGrade === 0 && prevLevel <= 1;
      const list = easy ? PRAISE_EASY : PRAISE_HARD;
      let title = list[(Math.random() * list.length) | 0];
      const elapsedSec = Math.max(1, Math.round((Date.now() - puzzleStartTime) / 1000));

      let earnedStars = 3;
      if (hintsUsed >= 2) earnedStars = 1;
      else if (hintsUsed === 1 || (undoOrClearUsed && elapsedSec > size * 10)) earnedStars = 2;

      let levelUpMsg = '';
      let toastIconChar = '🎉';

      if (tournamentMode) {
        puzzleSolved = true;
        if (typeof onTournamentStageWin === 'function') {
          onTournamentStageWin(elapsedSec, earnedStars);
        }
        return;
      }

      if (!puzzleSolved) {
        addSolved(prevGrade, prevLevel);
        if (typeof onPedagogicalWin === 'function') onPedagogicalWin(prevGrade, prevLevel, elapsedSec);
        pendingFloor = puzzleScore;
        puzzleSolved = true;

        if (!rushMode) {
          const req = requiredForLevel(prevGrade);
          const curProg = tourSolvedCount(prevGrade, prevLevel);
          const goldTourActive = (appData.goldTour || 0) > 0;
          const targetSec = goldTargetSec(prevGrade, prevLevel);

          if (goldTourActive && !isEduThemeActive() && curProg >= req && elapsedSec <= targetSec && hintsUsed === 0) {
            if (!appData.goldCrowns) appData.goldCrowns = {};
            appData.goldCrowns[levelKey(prevGrade, prevLevel)] = appData.goldTour;
          }

          if (curProg >= req) {
            // Bu seviyenin hedefi tamamlandı! Otomatik bir üst seviyeye/zorluğa geç!
            if (isEduThemeActive()) {
              const eduStore = getActiveProgressStore();
              const activeEduTheme = getActiveSymbolTheme();
              if (prevGrade === 2 && prevLevel === 2) {
                eduStore.unlockedIdx = EDU_MAX_UNLOCKED_IDX;
                eduStore.tourProgress = {};
                gradeIdx = 0;
                levelIdx = 0;
                saveCurrentThemePosition();
                pendingFloor = null;
                toastIconChar = '🎓';
                title = `🎉 ${activeEduTheme.name} Tamamlandı!`;
                levelUpMsg = `Harika! "${activeEduTheme.name}" temasındaki tüm 13 seviyeyi (3×3'ten 6×6'ya) başarıyla bitirdin! Şimdi yeni tur için 1. seviyeden tekrar başlayabilir veya dilediğin seviyeyi seçebilirsin.`;
                toastNext.textContent = '🔄 Yeni Tura Başla →';
              } else {
                let nextGi = prevGrade;
                let nextLi = prevLevel + 1;
                let gradeChanged = false;
                if (nextLi >= 5) {
                  nextGi = prevGrade + 1;
                  nextLi = 0;
                  gradeChanged = true;
                }
                const nextGlobal = Math.min(EDU_MAX_UNLOCKED_IDX, nextGi * 5 + nextLi);
                if (nextGlobal > (eduStore.unlockedIdx || 0)) {
                  eduStore.unlockedIdx = nextGlobal;
                }
                gradeIdx = nextGi;
                levelIdx = nextLi;
                saveCurrentThemePosition();
                pendingFloor = null;

                if (gradeChanged) {
                  toastIconChar = '🚀';
                  title = `${activeEduTheme.name} · ${GRADES[nextGi].label}!`;
                  levelUpMsg = `"${activeEduTheme.name}" temasında ${prevGradeLabel} kademesini bitirdin ve "${GRADES[nextGi].label} · Seviye 1" açıldı!`;
                  toastNext.textContent = `${GRADES[nextGi].label} Kademesine Başla →`;
                } else {
                  toastIconChar = '⬆️';
                  title = `Seviye ${GRADES[nextGi].levels[nextLi].level} Açıldı!`;
                  levelUpMsg = `"${activeEduTheme.name}" temasında ${req}/${req} hedefini tamamladın ve Seviye ${GRADES[nextGi].levels[nextLi].level}'e geçtin!`;
                  toastNext.textContent = `Seviye ${GRADES[nextGi].levels[nextLi].level}'e Geç →`;
                }
              }
            } else if (prevGrade === 5 && prevLevel === 4) {
              // 30. Seviye (Uzman - Seviye 5) bitti! 🌟 Altın Yıldız Turu başlasın!
              appData.goldTour = (appData.goldTour || 0) + 1;
              appData.unlockedIdx = 29;
              appData.tourProgress = {};
              gradeIdx = 0;
              levelIdx = 0;
              saveCurrentThemePosition();
              pendingFloor = null;
              toastIconChar = '👑';
              title = '🌟 ALTIN YILDIZ TURU AÇILDI!';
              levelUpMsg = `Tebrikler! Tüm 30 seviyeyi tamamladın! 🎖️ "👑 Büyük Zeka Ustası Tebrik Kartın" otomatik olarak Profilindeki "🏅 Başarılarım" bölümüne kaydedildi! Şimdi "🌟 Altın Yıldız Turu" başladı: 30 Altın Tacı (👑) topla!`;
              toastNext.textContent = '🌟 Altın Tura Başla →';
            } else {
              let nextGi = prevGrade;
              let nextLi = prevLevel + 1;
              let gradeChanged = false;
              if (nextLi >= 5) {
                nextGi = prevGrade + 1;
                nextLi = 0;
                gradeChanged = true;
              }
              const nextGlobal = nextGi * 5 + nextLi;
              if (nextGlobal > (appData.unlockedIdx || 0)) {
                appData.unlockedIdx = nextGlobal;
              }
              gradeIdx = nextGi;
              levelIdx = nextLi;
              saveCurrentThemePosition();
              pendingFloor = null;

              if (gradeChanged) {
                toastIconChar = '🚀';
                title = `Yeni Zorluk Açıldı: ${GRADES[nextGi].label}!`;
                levelUpMsg = `${prevGradeLabel} kademesini tamamen bitirdin! 🎖️ "${prevGradeLabel} Tebrik Kartın" otomatik olarak Profilindeki "🏅 Başarılarım" bölümüne kaydedildi ve "${GRADES[nextGi].label} · Seviye 1" açıldı!`;
                toastNext.textContent = `${GRADES[nextGi].label} Kademesine Başla →`;
              } else {
                toastIconChar = '⬆️';
                title = `Seviye ${GRADES[nextGi].levels[nextLi].level} Açıldı!`;
                levelUpMsg = `Bu seviyedeki ${req}/${req} hedefini tamamladın ve otomatik olarak Seviye ${GRADES[nextGi].levels[nextLi].level}'e geçtin!`;
                toastNext.textContent = `Seviye ${GRADES[nextGi].levels[nextLi].level}'e Geç →`;
              }
            }
            playLevelUpFanfare();
            saveAppData();
            updateGoldTourBanner();
          } else {
            const rem = req - curProg;
            levelUpMsg = `Seviye İlerlemesi: ${curProg}/${req} tamamlandı. Bir üst seviyeye otomatik geçmek için ${rem} bulmaca kaldı!`;
            toastNext.textContent = 'Sıradaki Soru →';
          }
        }
      }

      if (rushMode) {
        rushSolved++;
        rushTimeLeft += 10;
        if (rushSolved > (appData.bestRush || 0)) {
          appData.bestRush = rushSolved;
          saveAppData();
        }
        updateRushBanner();
      }

      const newBadges = checkWinAchievements(elapsedSec);

      playSuccess();
      spawnConfetti();
      buildGradeButtons();
      buildLevelButtons();
      updateStatus();

      if (rushMode) {
        noteEl.className = 'note';
        noteEl.textContent = `⚡ HARİKA! +10 Saniye Eklendi! (${rushSolved}. Çözüm · 🔥 ${streakCount} Seri)`;
        setTimeout(() => {
          if (rushMode) newPuzzle();
        }, 420);
        return;
      }

      const badgeLine = newBadges.length
        ? ` 🏅 Yeni Kupa: ${newBadges.map(b => b.icon + ' ' + b.title).join(', ')}!`
        : '';
      const streakLine = streakCount >= 2 ? ` · 🔥 ${streakCount}'li Seri!` : '';

      showToast('success', toastIconChar, title,
        `${prevGradeLabel} · Seviye ${prevLevelNum} · ${elapsedSec} sn${streakLine} · ` +
        levelUpMsg + badgeLine,
        { showNext: true, stars: earnedStars });
    }

    /* Buton İşlevleri */
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        playClick();
        undoOrClearUsed = true;
        rebuildPaths();
        activeLetter = null;
        tapLetter = null;
        isDrawing = false;
        lastCell = null;
        hintArmed = false;
        updateHintUI();
        updatePaths();
        updateHalos();
        if (memoryMode) startMemoryCountdown(3);
      });
    }

    btnUndo.addEventListener('click', () => {
      playClick();
      undoOrClearUsed = true;
      const curSerialized = serializePaths(paths);
      while (historyStack.length > 0) {
        const prev = historyStack.pop();
        if (serializePaths(prev) !== curSerialized) {
          paths = prev;
          activeLetter = null;
          tapLetter = null;
          isDrawing = false;
          lastCell = null;
          updatePaths();
          updateHalos();
          break;
        }
      }
    });

    btnNew.addEventListener('click', () => {
      playClick();
      if (tournamentMode) {
        playError();
        noteEl.className = 'note';
        noteEl.textContent = '🏆 Turnuva etabında soru değiştirilemez. Çıkmak için üstteki "✕ Turnuvadan Çık" butonunu kullan.';
        return;
      }
      dailyMode = false;
      if (btnDaily) btnDaily.classList.remove('active');
      newPuzzle();
    });

    btnCheck.addEventListener('click', () => {
      const result = validate();
      if (!result.valid) {
        playError();
        if (result.empty > 0) highlightEmptyCells();
        if (typeof onPedagogicalCheckFail === 'function') onPedagogicalCheckFail(result);
        showToast('gentle', '🌱', 'Çok Yaklaştın! Birlikte Bakalım',
          `${result.issues[0]} Harika gidiyorsun, beyin kasların güçleniyor! 🦉 Bilge Baykuş'un ipucu sorusuna göz atabilirsin.`);
        return;
      }
      triggerSingleWin();
    });

    toastNext.addEventListener('click', () => {
      hideToast();
      if (tournamentMode && typeof advanceTournamentStageOrFinish === 'function') {
        advanceTournamentStageOrFinish();
        return;
      }
      newPuzzle();
    });
    toastClose.addEventListener('click', hideToast);
    overlay.addEventListener('click', hideToast);

    /* Özel Modlar: Engelli Mod ve Diğer Araçlar */
    if (btnDaily) {
      btnDaily.addEventListener('click', () => {
        playClick();
        dailyMode = !dailyMode;
        btnDaily.classList.toggle('active', dailyMode);
        newPuzzle(dailyMode ? dailySeedCode() : null);
      });
    }

    btnObstacle.addEventListener('click', () => {
      playClick();
      obstacleMode = !obstacleMode;
      btnObstacle.classList.toggle('active', obstacleMode);
      newPuzzle();
    });

    // 60 Saniye Fırtına (Rush) Modu
    function updateRushBanner() {
      if (!rushBanner) return;
      rushBanner.classList.toggle('show', rushMode);
      rushSolvedEl.textContent = rushSolved;
      rushBestEl.textContent = appData.bestRush || 0;
      rushTimerEl.textContent = `⏱️ ${rushTimeLeft}sn`;
    }

    function stopRushMode(timeExpired) {
      clearInterval(rushInterval);
      const finalSolved = rushSolved;
      rushMode = false;
      btnRush.classList.remove('active');
      updateRushBanner();
      if (timeExpired) {
        playSuccess();
        if (finalSolved > 0) spawnConfetti();
        const rushMsg = finalSolved > 0
          ? `Harika bir denemeydi, beyin kasların gelişiyor! Bu turda ${finalSolved} bulmaca çözdün. En yüksek rekorun: ${appData.bestRush || 0}. Hazır olduğunda tekrar deneyelim!`
          : `Harika bir ısınma turuydu, beyin kasların gelişiyor! Acele etmeden kendi hızında oynayabilir veya hazır olduğunda bir daha deneyebilirsin!`;
        showToast('gentle', '🌱', 'Harika Bir Denemeydi!', rushMsg, { showNext: true });
      }
    }

    function toggleRushMode() {
      if (rushMode) {
        stopRushMode(false);
        return;
      }
      if (tournamentMode && typeof stopTournamentMode === 'function') stopTournamentMode();
      rushMode = true;
      rushTimeLeft = 60;
      rushSolved = 0;
      btnRush.classList.add('active');
      updateRushBanner();
      newPuzzle();
      clearInterval(rushInterval);
      rushInterval = setInterval(() => {
        if (!rushMode) return;
        rushTimeLeft--;
        updateRushBanner();
        if (rushTimeLeft <= 5 && rushTimeLeft > 0) {
          playTone(660, 0, 0.06, 'sine', 0.07);
        }
        if (rushTimeLeft <= 0) {
          stopRushMode(true);
        }
      }, 1000);
    }

    btnRush.addEventListener('click', () => {
      playClick();
      toggleRushMode();
    });

    // Gelişmiş 🧠 Hafıza Modu Kontrolleri (Akıllı Süre + Hazırım + 🔦 Fener + 🌈 Renk İpucu)
    const btnMemoryReady = document.getElementById('btnMemoryReady');
    const btnMemoryPeek = document.getElementById('btnMemoryPeek');
    const btnMemoryColorHint = document.getElementById('btnMemoryColorHint');

    btnMemory.addEventListener('click', () => {
      playClick();
      memoryMode = !memoryMode;
      btnMemory.classList.toggle('active', memoryMode);
      if (memoryMode) {
        if (extraToolsDrawer && extraToolsDrawer.classList.contains('open')) {
          extraToolsDrawer.classList.remove('open');
          if (btnToggleExtraTools) btnToggleExtraTools.innerHTML = '<span>⚙️</span><span>Modlar ▾</span>';
        }
        startMemoryCountdown();
        requestAnimationFrame(() => {
          const b = document.getElementById('memoryBanner');
          if (b && window.innerWidth <= 768) b.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        clearInterval(memoryTimer);
        clearTimeout(memoryPeekTimeout);
        memoryHidden = false;
        tempRevealedLetter = null;
        updateMemoryBannerUI();
        render();
        updateStatus();
      }
    });

    if (btnMemoryReady) {
      btnMemoryReady.addEventListener('click', () => {
        if (!memoryMode || memoryHidden) return;
        playPathComplete();
        clearInterval(memoryTimer);
        memoryCountdown = 0;
        memoryHidden = true;
        if (typeof ensureLeagueWeekSync === 'function') ensureLeagueWeekSync();
        appData.score = (appData.score || 0) + 15;
        appData.weeklyLeagueScore = (appData.weeklyLeagueScore || 0) + 15;
        saveAppData();
        updateStatsUI();
        if (typeof syncPlayerToCloudLeaderboard === 'function') syncPlayerToCloudLeaderboard(false);
        updateSymbolTexts();
        render();
        updateMemoryBannerUI();
        noteEl.className = 'note teach';
        noteEl.textContent = '🌟 Süpersin! Erken gizlediğin için +15 Hafıza Bonusu kazandın! Şimdi eşleştir.';
      });
    }

    if (btnMemoryPeek) {
      btnMemoryPeek.addEventListener('click', () => {
        if (!memoryMode || !memoryHidden || memoryPeeksLeft <= 0) return;
        playHint();
        memoryPeeksLeft--;
        memoryHidden = false;
        updateSymbolTexts();
        render();
        updateMemoryBannerUI();
        noteEl.className = 'note teach';
        noteEl.textContent = `🔦 Fener Açıldı! (1.5 saniye dikkatli bak · Kalan fener hakkın: ${memoryPeeksLeft})`;
        clearTimeout(memoryPeekTimeout);
        memoryPeekTimeout = setTimeout(() => {
          if (!memoryMode) return;
          memoryHidden = true;
          updateSymbolTexts();
          render();
          updateMemoryBannerUI();
          noteEl.className = 'note';
          noteEl.textContent = '🧠 Fener kapandı! Şimdi gördüğün harfleri birbirine bağla.';
        }, 1600);
      });
    }

    if (btnMemoryColorHint) {
      btnMemoryColorHint.addEventListener('click', () => {
        playClick();
        memoryColorHint = !memoryColorHint;
        updateMemoryBannerUI();
        render();
      });
    }

    // Kupa ve Madalya Dolabı Modalı
    const badgeOverlay = document.getElementById('badgeOverlay');
    const badgeModal = document.getElementById('badgeModal');
    const badgeGrid = document.getElementById('badgeGrid');
    const badgeModalSummary = document.getElementById('badgeModalSummary');
    const badgeClose = document.getElementById('badgeClose');

    function renderBadgeModal() {
      const unlockedMap = appData.achievements || {};
      const unlockedCount = Object.keys(unlockedMap).length;
      badgeModalSummary.textContent = `Kazanılan Madalya: ${unlockedCount} / ${ACHIEVEMENTS.length}`;
      badgeGrid.innerHTML = ACHIEVEMENTS.map(a => {
        const isUnlocked = !!unlockedMap[a.id];
        return `<div class="badge-item ${isUnlocked ? 'unlocked' : ''}">
          <div class="b-ic">${a.icon}</div>
          <div class="b-title">${a.title}</div>
          <div class="b-desc">${a.desc}</div>
          <span class="b-state">${isUnlocked ? '✓ Kazanıldı' : '🔒 Kilitli'}</span>
        </div>`;
      }).join('');
    }

    function openBadgeModal() {
      renderBadgeModal();
      badgeOverlay.classList.add('show');
      badgeModal.classList.add('show');
    }
    function closeBadgeModal() {
      badgeOverlay.classList.remove('show');
      badgeModal.classList.remove('show');
    }
    if (btnBadges) btnBadges.addEventListener('click', () => { playClick(); openBadgeModal(); });
    if (statBadgeWrap) statBadgeWrap.addEventListener('click', () => { playClick(); openProfileModal(); });
    if (badgeClose) badgeClose.addEventListener('click', () => { playClick(); closeBadgeModal(); });
    if (badgeOverlay) badgeOverlay.addEventListener('click', closeBadgeModal);

    // Soru Kodu Modalı
    const seedOverlay = document.getElementById('seedOverlay');
    const seedModal = document.getElementById('seedModal');
    const currentSeedDisplay = document.getElementById('currentSeedDisplay');
    const seedInput = document.getElementById('seedInput');
    const seedCancel = document.getElementById('seedCancel');
    const seedApply = document.getElementById('seedApply');

    function openSeedModal() {
      currentSeedDisplay.textContent = `Mevcut Soru Kodu: #${currentSeedCode} (${GRADES[gradeIdx].label} · Seviye ${levelCfg().level})`;
      seedInput.value = currentSeedCode;
      seedOverlay.classList.add('show');
      seedModal.classList.add('show');
    }
    function closeSeedModal() {
      seedOverlay.classList.remove('show');
      seedModal.classList.remove('show');
    }
    if (btnSeed) btnSeed.addEventListener('click', () => { playClick(); openSeedModal(); });
    if (seedCancel) seedCancel.addEventListener('click', () => { playClick(); closeSeedModal(); });
    if (seedOverlay) seedOverlay.addEventListener('click', closeSeedModal);
    if (seedApply) seedApply.addEventListener('click', () => {
      const val = parseInt(seedInput.value, 10);
      if (isNaN(val) || val < 1000 || val > 9999) {
        playError();
        showToast('error', '!', 'Geçersiz Kod', 'Lütfen 1000 ile 9999 arasında 4 haneli bir kod girin.');
        return;
      }
      playClick();
      dailyMode = false;
      if (btnDaily) btnDaily.classList.remove('active');
      closeSeedModal();
      newPuzzle(val);
    });

    /* 🏆 HER GÜN SAAT 20:00 ULUSAL TURNUVA MOTORU (Canlı Geri Sayım + Bekleme Salonu + 5 Etap) */
    const tourneyOverlay = document.getElementById('tourneyOverlay');
    const tourneyModal = document.getElementById('tourneyModal');
    const tourneyCountdownBadge = document.getElementById('tourneyCountdownBadge');
    const tourneyStatusNote = document.getElementById('tourneyStatusNote');
    const tourneySummaryBar = document.getElementById('tourneySummaryBar');
    const tourneyStageList = document.getElementById('tourneyStageGrid');
    const tourneyLeaderboardBox = document.getElementById('tourneyLeaderboardBox');
    const tourneyClose = document.getElementById('tourneyClose');
    const tourneyStartBtn = document.getElementById('tourneyStartBtn');
    const tourneyPdfQuick = document.getElementById('tourneyPdfQuick');
    const tourneyBanner = document.getElementById('tourneyBanner');
    const tourneyBannerTitle = document.getElementById('tourneyBannerTitle');
    const tourneyBannerTimer = document.getElementById('tourneyBannerTimer');
    const btnTourneyExit = document.getElementById('btnTourneyExit');
    const tourneyCardBtn = document.getElementById('tourneyCardBtn');
    const TOURNEY_HOUR = 20;
    const TOURNEY_END_HOUR = 21;
    let tourneyFrozenSec = 0;

    const TOURNAMENT_STAGES = [
      { stage: 1, title: '1. Etap · Isınma Turu', size: 4, pairs: 3, gi: 0, li: 1, basePts: 100, targetSec: 25, pct: 0.45 },
      { stage: 2, title: '2. Etap · Çeyrek Final', size: 5, pairs: 4, gi: 1, li: 2, basePts: 150, targetSec: 35, pct: 0.55 },
      { stage: 3, title: '3. Etap · Yarı Final', size: 6, pairs: 5, gi: 2, li: 2, basePts: 200, targetSec: 50, pct: 0.65 },
      { stage: 4, title: '4. Etap · Süper Final Öncesi', size: 7, pairs: 6, gi: 3, li: 3, basePts: 250, targetSec: 70, pct: 0.72 },
      { stage: 5, title: '5. Etap · Büyük Şampiyonluk Finali', size: 8, pairs: 6, gi: 4, li: 3, basePts: 350, targetSec: 95, pct: 0.80 }
    ];

    const tPad2 = n => String(n).padStart(2, '0');
    function dateKeyOf(d) {
      return `${d.getFullYear()}-${tPad2(d.getMonth() + 1)}-${tPad2(d.getDate())}`;
    }
    function getTourneyDateKey() {
      return dateKeyOf(new Date());
    }
    function getTourneyPhase(now = new Date()) {
      const h = now.getHours();
      if (h < TOURNEY_HOUR) return 'before';
      if (h < TOURNEY_END_HOUR) return 'live';
      return 'closed';
    }
    function nextTourneyStart(now = new Date()) {
      const t = new Date(now);
      if (now.getHours() >= TOURNEY_HOUR) t.setDate(t.getDate() + 1);
      t.setHours(TOURNEY_HOUR, 0, 0, 0);
      return t;
    }
    function formatHMS(totalSec) {
      const s = Math.max(0, Math.floor(totalSec));
      return `${tPad2(Math.floor(s / 3600))}:${tPad2(Math.floor((s % 3600) / 60))}:${tPad2(s % 60)}`;
    }
    function secsToNextStart() {
      return Math.max(0, Math.ceil((nextTourneyStart().getTime() - Date.now()) / 1000));
    }
    function secsToLiveEnd() {
      const e = new Date();
      e.setHours(TOURNEY_END_HOUR, 0, 0, 0);
      return Math.max(0, Math.ceil((e.getTime() - Date.now()) / 1000));
    }

    function getTourneySeedForStage(stageIndex, dateStr) {
      const dStr = dateStr || getTourneyDateKey();
      let h = 2166136261;
      const str = `TOURNEY-2000-${dStr}-S${stageIndex + 1}`;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return 1000 + (Math.abs(h) % 9000);
    }

    function ensureTourneyState() {
      const today = getTourneyDateKey();
      if (!appData.tourney || appData.tourney.date !== today) {
        appData.tourney = {
          date: today,
          stageIdx: 0,
          completed: false,
          totalScore: 0,
          totalSec: 0,
          stageScores: [0, 0, 0, 0, 0],
          stageTimes: [0, 0, 0, 0, 0],
          officialRun: false
        };
        saveAppData();
      }
      return appData.tourney;
    }

    function isTourneyLiveWindow() {
      return getTourneyPhase() === 'live';
    }

    // Bekleme salonunun ait olduğu turnuva günü (bugün canlıysa ve bitirilmediyse bugün, aksi halde bir sonraki 20:00)
    function upcomingTourneyKey() {
      const tState = ensureTourneyState();
      if (getTourneyPhase() === 'live' && !tState.completed) return tState.date;
      return dateKeyOf(nextTourneyStart());
    }
    function isInLobby() {
      return !!appData.tourneyLobbyFor && appData.tourneyLobbyFor === upcomingTourneyKey();
    }

    function updateTourneyClockUI() {
      const phase = getTourneyPhase();
      const tState = ensureTourneyState();
      const liveOpen = phase === 'live' && !tState.completed;
      const inLobby = isInLobby();

      if (tourneyBtnLabel) {
        if (liveOpen) {
          tourneyBtnLabel.textContent = `🔴 CANLI ${formatHMS(secsToLiveEnd()).slice(3)}`;
        } else {
          const cd = formatHMS(secsToNextStart());
          tourneyBtnLabel.textContent = tState.completed ? `✅ ${cd}` : (inLobby ? `🟢 ${cd}` : `⏳ ${cd}`);
        }
      }
      if (btnTournament) {
        btnTournament.classList.toggle('tourney-live', liveOpen);
        btnTournament.classList.toggle('tourney-waiting', !liveOpen && inLobby);
        btnTournament.title = liveOpen
          ? 'Turnuva şu an CANLI! Kapanışa kalan süre gösteriliyor.'
          : (inLobby ? 'Bekleme salonundasın. Saat 20:00 olunca turnuva otomatik başlar.'
                     : 'Her gün saat 20:00\'de başlayan Büyük Akşam Turnuvası. Geri sayım: bir sonraki turnuvaya kalan süre.');
      }

      if (tourneyCountdownBadge) {
        if (liveOpen) {
          tourneyCountdownBadge.style.background = '#c62828';
          tourneyCountdownBadge.textContent = `🔴 CANLI · Kapanışa ${formatHMS(secsToLiveEnd()).slice(3)}`;
        } else {
          tourneyCountdownBadge.style.background = inLobby ? '#2e7d32' : '#4a148c';
          tourneyCountdownBadge.textContent = `⏳ 20:00'a ${formatHMS(secsToNextStart())}`;
        }
      }
    }

    function autoStartFromLobby() {
      if (overlay.classList.contains('show')) hideToast();
      ['pdfModal', 'seedModal', 'badgeModal', 'profileModal'].forEach(id => {
        const m = document.getElementById(id);
        if (m && m.classList.contains('show')) {
          m.classList.remove('show');
          const ov = document.getElementById(id.replace('Modal', 'Overlay'));
          if (ov) ov.classList.remove('show');
        }
      });
      playLevelUpFanfare();
      startTournamentFlow();
      noteEl.className = 'note teach';
      noteEl.textContent = '🔔 Saat 20:00! Bekleme salonundan doğrudan 1. Etaba alındın. Süre başladı, başarılar!';
    }

    function tourneyTick() {
      const phase = getTourneyPhase();
      const tState = ensureTourneyState();

      // Bekleme salonundaki oyuncu için saat 20:00 olduğunda otomatik başlat
      if (phase === 'live' && !tState.completed && !tournamentMode &&
          appData.tourneyLobbyFor && appData.tourneyLobbyFor === tState.date) {
        appData.tourneyLobbyFor = null;
        saveAppData();
        autoStartFromLobby();
      }

      // Salondakiler için son 10 saniye uyarı sesi
      if (phase !== 'live' && isInLobby()) {
        const s = secsToNextStart();
        if (s > 0 && s <= 10) playTone(s <= 3 ? 880 : 660, 0, 0.08, 'sine', 0.07);
      }

      updateTourneyClockUI();
      updateTourneyInGameBanner();
      if (tourneyModal && tourneyModal.classList.contains('show')) {
        renderTourneyStartBtn();
        renderTourneyStatusNote();
      }
    }

    setInterval(tourneyTick, 1000);
    setTimeout(tourneyTick, 80);

    /* ---------- 🧩 TEK ÇÖZÜM DOĞRULAYICI (Numberlink çözücü, en fazla 2 çözüm sayar) ---------- */
    function countPuzzleSolutions(puzzle, limit = 2, nodeLimit = 60000, collect = false) {
      const n = puzzle.s;
      const N = n * n;
      const grid = new Int16Array(N).fill(-1);          // -1 boş, -2 engel, k = renk
      (puzzle.obstacles || []).forEach(i => { grid[i] = -2; });
      const P = puzzle.sol.length;
      const heads = new Int16Array(P);
      const targets = new Int16Array(P);
      const done = new Uint8Array(P);
      puzzle.sol.forEach((cells, k) => {
        heads[k] = cells[0];
        targets[k] = cells[cells.length - 1];
        grid[cells[0]] = k;
        grid[cells[cells.length - 1]] = k;
      });
      const nb = [];
      for (let i = 0; i < N; i++) {
        const r = (i / n) | 0, c = i % n, list = [];
        if (r > 0) list.push(i - n);
        if (r < n - 1) list.push(i + n);
        if (c > 0) list.push(i - 1);
        if (c < n - 1) list.push(i + 1);
        nb.push(list);
      }
      let empty = 0;
      for (let i = 0; i < N; i++) if (grid[i] === -1) empty++;

      let found = 0, nodes = 0, aborted = false;
      const seenSigs = new Set();
      const sols = [];
      const comp = new Int16Array(N);
      const queue = new Int16Array(N);

      // Güvenli budama: boş bölgeler ve uç erişilebilirliği
      function feasible() {
        // 1) Her boş hücrenin en az 2 "kullanılabilir" komşusu olmalı (boş veya bitmemiş çiftin başı/hedefi)
        for (let i = 0; i < N; i++) {
          if (grid[i] !== -1) continue;
          let ok = 0;
          for (const j of nb[i]) {
            const g = grid[j];
            if (g === -1) ok++;
            else if (g >= 0 && !done[g] && (heads[g] === j || targets[g] === j)) ok++;
          }
          if (ok < 2) return false;
        }
        // 2) Boş bölgeleri etiketle
        comp.fill(-1);
        let cid = 0;
        for (let i = 0; i < N; i++) {
          if (grid[i] !== -1 || comp[i] !== -1) continue;
          let qh = 0, qt = 0;
          queue[qt++] = i; comp[i] = cid;
          while (qh < qt) {
            const x = queue[qh++];
            for (const j of nb[x]) {
              if (grid[j] === -1 && comp[j] === -1) { comp[j] = cid; queue[qt++] = j; }
            }
          }
          cid++;
        }
        const served = new Uint8Array(cid);
        // 3) Her bitmemiş çiftin başı hedefine (doğrudan veya ortak bir boş bölge üzerinden) ulaşabilmeli
        for (let k = 0; k < P; k++) {
          if (done[k]) continue;
          const h = heads[k], t = targets[k];
          if (nb[h].includes(t)) {
            for (const j of nb[h]) if (grid[j] === -1) for (const q of nb[t]) if (grid[q] === -1 && comp[q] === comp[j]) served[comp[j]] = 1;
            continue;
          }
          let reach = false;
          for (const j of nb[h]) {
            if (grid[j] !== -1) continue;
            for (const q of nb[t]) {
              if (grid[q] === -1 && comp[q] === comp[j]) { reach = true; served[comp[j]] = 1; }
            }
          }
          if (!reach) return false;
        }
        // 4) Hiçbir çiftin kullanamayacağı (sahipsiz) boş bölge kalmamalı
        for (let c = 0; c < cid; c++) if (!served[c]) return false;
        return true;
      }

      function dfs() {
        if (aborted || found >= limit) return;
        if (++nodes > nodeLimit) { aborted = true; return; }
        let best = -1, bestMoves = null;
        for (let k = 0; k < P; k++) {
          if (done[k]) continue;
          const moves = [];
          for (const j of nb[heads[k]]) if (grid[j] === -1 || j === targets[k]) moves.push(j);
          if (!moves.length) return;
          if (!bestMoves || moves.length < bestMoves.length) { best = k; bestMoves = moves; }
        }
        if (best === -1) {
          if (empty === 0) {
            // Aynı renk bölgesindeki farklı rotalar oyuncu için aynı cevaptır: farklı RENKLENDİRMELERİ say
            const sig = Array.prototype.join.call(grid, ',');
            if (!seenSigs.has(sig)) {
              seenSigs.add(sig);
              found = seenSigs.size;
              if (collect) sols.push(Int16Array.from(grid));
            }
          }
          return;
        }
        const k = best;
        const prevHead = heads[k];
        for (const m of bestMoves) {
          if (m === targets[k]) {
            done[k] = 1;
            if (feasible()) dfs();
            done[k] = 0;
          } else {
            grid[m] = k; empty--; heads[k] = m;
            if (feasible()) dfs();
            grid[m] = -1; empty++; heads[k] = prevHead;
          }
          if (aborted || found >= limit) return;
        }
      }

      if (feasible()) dfs();
      return { count: found, aborted, nodes, sols };
    }

    // Çok çözümlü bulmacayı tek çözümlüye dönüştür: iki çözümün ayrıştığı yolu ikiye bölerek yeni bir harf çifti ekle
    function refineToUnique(puzzle, maxSteps = 6) {
      let pz = { ...puzzle, sol: puzzle.sol.map(c => c.slice()), obstacles: (puzzle.obstacles || []).slice() };
      const n = pz.s;
      const segOk = (seg, blocked) => {
        if (seg.length < 3) return false;
        const a = seg[0], b = seg[seg.length - 1];
        if (manhattanIdx(a, b, n) < 2) return false;
        if (hasDirectLineOfSight(a, b, blocked, n)) return false;
        return countTurns(seg) >= 1;
      };
      for (let step = 0; step <= maxSteps; step++) {
        const res = countPuzzleSolutions(pz, 2, 60000, true);
        if (res.aborted) return { puzzle: pz, unique: false };
        if (res.count === 1) return { puzzle: pz, unique: true };
        if (step === maxSteps || pz.sol.length >= LETTERS.length) break;

        const intended = new Int16Array(n * n).fill(-2);
        const blocked = new Set(pz.obstacles || []);
        pz.sol.forEach((cells, k) => {
          blocked.add(cells[0]);
          blocked.add(cells[cells.length - 1]);
          cells.forEach(i => { intended[i] = k; });
        });
        const alt = res.sols.find(g => g.some((v, i) => v !== intended[i]));
        if (!alt) break;
        const diff = new Set();
        for (let i = 0; i < n * n; i++) if (alt[i] !== intended[i] && intended[i] >= 0) diff.add(i);

        // Ayrışan hücreleri en çok içeren yolu, mümkün olan en dengeli noktadan böl
        let bestK = -1, bestCut = -1, bestScore = -Infinity;
        pz.sol.forEach((cells, k) => {
          const hits = cells.filter(i => diff.has(i)).length;
          if (!hits) return;
          for (let cut = 2; cut <= cells.length - 3; cut++) {
            const s1 = cells.slice(0, cut + 1), s2 = cells.slice(cut + 1);
            const bNext = new Set(blocked);
            bNext.add(cells[cut]);
            bNext.add(cells[cut + 1]);
            if (!segOk(s1, bNext) || !segOk(s2, bNext)) continue;
            const nearDiff = (diff.has(cells[cut]) ? 1 : 0) + (diff.has(cells[cut + 1]) ? 1 : 0);
            const balance = -Math.abs(s1.length - s2.length) * 0.05;
            const score = hits * 2 + nearDiff * 3 + balance;
            if (score > bestScore) { bestScore = score; bestK = k; bestCut = cut; }
          }
        });
        if (bestK < 0) break;
        const cells = pz.sol[bestK];
        pz.sol[bestK] = cells.slice(0, bestCut + 1);
        pz.sol.push(cells.slice(bestCut + 1));
      }
      return { puzzle: pz, unique: false };
    }

    // Turnuva etabı: tek çözümlü olduğu doğrulanan ilk deterministik soruyu seç (sonuç günlük önbelleğe alınır)
    function getVerifiedTourneyPuzzle(stageIdx, dateKey) {
      const st = TOURNAMENT_STAGES[stageIdx];
      const baseCode = getTourneySeedForStage(stageIdx, dateKey);
      const persist = dateKey === ensureTourneyState().date;
      if (persist && (!appData.tourneyUniqueCache || appData.tourneyUniqueCache.date !== dateKey)) {
        appData.tourneyUniqueCache = { date: dateKey, codes: {} };
      }
      const cache = persist ? appData.tourneyUniqueCache.codes : {};
      const make = (code) => generatePuzzle(st.size, st.pairs, st.pct, null, 50, {
        seedCode: code, gi: st.gi, li: st.li, withObstacles: false
      });
      const cached = cache[stageIdx];
      if (cached && cached.v === 2) {
        const p = make(cached.code);
        if (p) {
          const ref = cached.unique ? refineToUnique(p, 8) : { puzzle: p, unique: false };
          if (!cached.unique || ref.unique) return ref;
        }
      }
      let fallback = null;
      for (let a = 0; a < 6; a++) {
        const code = 1000 + ((baseCode - 1000 + a * 7919) % 9000);
        const p = make(code);
        if (!p) continue;
        if (!fallback) fallback = { puzzle: p, code };
        const ref = refineToUnique(p, 8);
        if (ref.unique) {
          cache[stageIdx] = { code, unique: true, v: 2 };
          if (persist) saveAppData();
          return ref;
        }
      }
      if (fallback) {
        cache[stageIdx] = { code: fallback.code, unique: false, v: 2 };
        if (persist) saveAppData();
        return { puzzle: fallback.puzzle, unique: false };
      }
      return { puzzle: null, unique: false };
    }

    /* ---------- 🌐 GERÇEK BULUT TURNUVA SIRALAMASI ---------- */
    const TOURNEY_MAX_SCORE = TOURNAMENT_STAGES.reduce((s, st) => s + st.basePts + st.targetSec * 3 + 40, 0);
    let tourneyCloud = { date: null, list: null, status: 'idle', fetchedAt: 0 };

    function tourneyCloudKey(dateKey) {
      return 'abc_tr_' + String(dateKey).replace(/[^0-9]/g, '_');
    }

    function sanitizeTourneyEntries(obj) {
      if (!obj || typeof obj !== 'object' || !obj.p || typeof obj.p !== 'object') return [];
      return Object.keys(obj.p).map(id => {
        const e = obj.p[id] || {};
        return {
          id,
          name: String(e.n || 'Oyuncu').slice(0, 20),
          icon: String(e.i || '🦊').slice(0, 4),
          score: Math.floor(Number(e.s) || 0),
          sec: Math.floor(Number(e.t) || 0),
          stages: Math.min(5, Math.max(0, Math.floor(Number(e.g) || 0))),
          done: !!e.d
        };
      }).filter(e => e.score > 0 && e.score <= TOURNEY_MAX_SCORE && e.sec >= 3 && e.sec < 36000);
    }

    async function syncTourneyCloud(pushMine) {
      const tState = ensureTourneyState();
      const dateKey = tState.date;
      if (!pushMine && tourneyCloud.date === dateKey && Date.now() - tourneyCloud.fetchedAt < 20000) return;
      tourneyCloud.status = 'loading';
      try {
        const key = tourneyCloudKey(dateKey);
        const res = await fetch(`${CLOUD_KV_BASE}/GetValue/${CLOUD_KV_APP_KEY}/${key}`, { cache: 'no-store' });
        let obj = null;
        if (res.ok) obj = decodeCloudPayload(await res.text());
        if (!obj || typeof obj !== 'object' || !obj.p) obj = { d: dateKey, p: {} };

        if (pushMine && tState.totalScore > 0) {
          ensureProfilesInit();
          const prof = appData.profiles[appData.activeProfileIdx || 0] || {};
          obj.p[getCurrentPlayerCloudId()] = {
            n: String(prof.name || 'Oyuncu').slice(0, 20),
            i: prof.icon || '🦊',
            s: Math.min(TOURNEY_MAX_SCORE, tState.totalScore),
            t: tState.totalSec,
            g: tState.stageScores.filter(x => x > 0).length,
            d: tState.completed ? 1 : 0
          };
          const ids = Object.keys(obj.p).sort((a, b) =>
            ((obj.p[b].s || 0) - (obj.p[a].s || 0)) || ((obj.p[a].t || 0) - (obj.p[b].t || 0)));
          ids.slice(50).forEach(id => { delete obj.p[id]; });
          const encoded = encodeCloudPayload(obj);
          if (encoded) await fetch(`${CLOUD_KV_BASE}/UpdateValue/${CLOUD_KV_APP_KEY}/${key}/${encoded}`, { method: 'POST' });
        }
        tourneyCloud = { date: dateKey, list: sanitizeTourneyEntries(obj), status: 'ok', fetchedAt: Date.now() };
      } catch (_) {
        tourneyCloud = { date: dateKey, list: null, status: 'offline', fetchedAt: Date.now() };
      }
      if (tourneyModal && tourneyModal.classList.contains('show')) renderTourneyModal();
    }

    // Sıralama tablosu: gerçek bulut oyuncuları + (azsa) açıkça etiketli antrenman botları
    function buildTourneyBoard(tState) {
      const myId = (typeof getCurrentPlayerCloudId === 'function') ? getCurrentPlayerCloudId() : 'me';
      const prof = (appData.profiles && appData.profiles[appData.activeProfileIdx || 0]) || { icon: '🦊', name: 'Oyuncu' };
      const online = tourneyCloud.status === 'ok' && tourneyCloud.date === tState.date && Array.isArray(tourneyCloud.list);
      let list = online ? tourneyCloud.list.map(e => ({ ...e, isMe: e.id === myId, bot: false })) : [];
      if (tState.totalScore > 0) {
        const mine = list.find(e => e.isMe);
        const local = {
          id: myId, name: `${prof.name || 'Oyuncu'} (Sen)`, icon: prof.icon || '🦊',
          score: tState.totalScore, sec: tState.totalSec,
          stages: tState.stageScores.filter(x => x > 0).length, done: tState.completed, isMe: true, bot: false
        };
        if (mine) Object.assign(mine, local); else list.push(local);
      }
      const realCount = list.filter(e => !e.bot).length;
      if (realCount < 3) {
        let seed = 0;
        for (let i = 0; i < tState.date.length; i++) seed = (seed * 31 + tState.date.charCodeAt(i)) % 100000;
        ['Çevik', 'Bilge', 'Atom'].forEach((nm, i) => {
          list.push({
            id: 'bot' + i, name: `🤖 ${nm} Bot`, icon: '', bot: true, isMe: false, done: true, stages: 5,
            score: 900 + ((seed + i * 137) % 400), sec: 170 + ((seed + i * 89) % 130)
          });
        });
      }
      list.sort((a, b) => (b.score - a.score) || (a.sec - b.sec));
      const myRank = list.findIndex(e => e.isMe) + 1;
      return { list, online, realCount, myRank, realRank: list.filter(e => !e.bot).findIndex(e => e.isMe) + 1 };
    }

    function renderTourneyStatusNote() {
      if (!tourneyStatusNote) return;
      const tState = ensureTourneyState();
      const phase = getTourneyPhase();
      const inLobby = isInLobby();
      const cd = formatHMS(secsToNextStart());
      let html;
      if (tState.completed) {
        html = `🎉 <strong>Bugünün turnuvasını tamamladın!</strong> Toplam: <strong>${tState.totalScore} puan</strong> · ${tState.totalSec} sn. ` +
               (inLobby ? `🟢 Yarınki turnuvanın bekleme salonundasın (${cd}).` : `Yarınki 20:00 turnuvası için şimdiden bekleme salonuna girebilirsin.`);
      } else if (phase === 'live') {
        html = `🔴 <strong>Turnuva şu an CANLI!</strong> 5 etabı sırayla çöz; hız ve ipucusuz çözüm bonuslarını topla. Kapanış: <strong>21:00</strong>.` +
               (tState.stageIdx > 0 ? ` Kaldığın yer: <strong>${tState.stageIdx + 1}. Etap</strong>.` : '');
      } else if (inLobby) {
        html = `🟢 <strong>Bekleme salonundasın.</strong> Turnuva <strong>${cd}</strong> sonra (saat 20:00) <strong>otomatik</strong> başlayacak. ` +
               `Bu sürede normal oyuna devam edebilirsin; son 10 saniyede sesli uyarı alırsın. Salondan çıkmak için alttaki butona tekrar dokun.`;
      } else if (phase === 'closed') {
        html = `🌙 <strong>Bugünkü turnuva 21:00'de kapandı.</strong> Bir sonraki turnuva yarın <strong>20:00</strong>'de (${cd}). Şimdiden bekleme salonuna girip saatin gelmesini bekleyebilirsin.`;
      } else {
        html = `🕗 Turnuva <strong>her gün saat 20:00</strong>'de başlar (20:00–21:00 arası açık). İstediğin saatte <strong>bekleme salonuna</strong> gir; saat geldiğinde turnuva otomatik başlar. Kalan süre: <strong>${cd}</strong>.`;
      }
      tourneyStatusNote.innerHTML = html;
    }

    function renderTourneyStartBtn() {
      if (!tourneyStartBtn) return;
      const tState = ensureTourneyState();
      const phase = getTourneyPhase();
      const inLobby = isInLobby();
      tourneyStartBtn.disabled = false;
      tourneyStartBtn.style.background = '';
      tourneyStartBtn.style.borderColor = '';
      if (phase === 'live' && !tState.completed) {
        tourneyStartBtn.textContent = tState.stageIdx > 0 ? `▶️ ${tState.stageIdx + 1}. Etaptan Devam` : '🔴 Hemen Başla!';
      } else if (inLobby) {
        tourneyStartBtn.textContent = `🟢 Salondasın · ${formatHMS(secsToNextStart())}`;
        tourneyStartBtn.style.background = '#2e7d32';
        tourneyStartBtn.style.borderColor = '#2e7d32';
      } else {
        tourneyStartBtn.textContent = '🚪 Bekleme Salonuna Gir';
      }
    }

    function renderTourneyModal() {
      const tState = ensureTourneyState();
      updateTourneyClockUI();
      renderTourneyStatusNote();
      renderTourneyStartBtn();

      if (tourneySummaryBar) {
        const doneCount = tState.stageScores.filter(s => s > 0).length;
        tourneySummaryBar.textContent = `Bugünkü İlerlemen: ${doneCount} / 5 Etap · Turnuva Puanın: ${tState.totalScore || 0}`;
      }

      if (tourneyStageList) {
        const revealCodes = tState.completed || getTourneyPhase() !== 'before';
        tourneyStageList.innerHTML = TOURNAMENT_STAGES.map((st, idx) => {
          const sc = tState.stageScores[idx] || 0;
          const tm = tState.stageTimes[idx] || 0;
          const isDone = sc > 0;
          const isCurr = !tState.completed && idx === tState.stageIdx;
          const cachedCode = appData.tourneyUniqueCache && appData.tourneyUniqueCache.date === tState.date && appData.tourneyUniqueCache.codes[idx];
          const codeTxt = revealCodes
            ? ` · Kod: #${cachedCode ? cachedCode.code : getTourneySeedForStage(idx, tState.date)}${cachedCode && cachedCode.unique ? ' ✔' : ''}`
            : '';
          return `<div class="tourney-stage-row ${isDone ? 'done' : ''} ${isCurr ? 'active-stage' : ''}">
            <div>
              <div style="font-weight:900;">${isDone ? '✅' : (isCurr ? '▶️' : '🔒')} ${st.title}</div>
              <div style="font-size:0.72rem;opacity:0.75;">${st.size}×${st.size} · ${st.pairs} Çift · Hedef: ${st.targetSec} sn${codeTxt}</div>
            </div>
            <div style="text-align:right;">
              ${isDone
                ? `<span style="color:#2e7d32;font-weight:900;">+${sc} Puan</span><div style="font-size:0.7rem;opacity:0.75;">⏱️ ${tm} sn</div>`
                : `<span style="color:#b45309;font-weight:800;">${st.basePts} Puan</span>`}
            </div>
          </div>`;
        }).join('');
      }

      if (tourneyLeaderboardBox) {
        const board = buildTourneyBoard(tState);
        const statusLine = board.online
          ? `🟢 Canlı bulut sıralaması · ${board.realCount} gerçek oyuncu${board.realRank ? ` · Senin sıran: ${board.realRank}.` : ''}`
          : (tourneyCloud.status === 'loading' ? '🔄 Bulut sıralaması yükleniyor...' : '🌐 Çevrimdışı: yalnızca senin sonucun gösteriliyor.');
        tourneyLeaderboardBox.innerHTML = `<div style="font-weight:900;margin-bottom:6px;display:flex;justify-content:space-between;">
            <span>🏅 Günün Sıralaması (${tState.date})</span>
            <span>Puan / Süre</span>
          </div>` +
          board.list.map((r, i) => `<div style="display:flex;justify-content:space-between;padding:4px 6px;border-radius:6px;margin-bottom:3px;background:${r.isMe ? '#fef3c7' : (r.bot ? 'rgba(236,239,241,0.85)' : 'rgba(255,255,255,0.85)')};color:#263238;border:${r.isMe ? '1.5px solid #f59e0b' : '1px solid rgba(0,0,0,0.05)'};font-weight:${r.isMe ? '900' : '700'};${r.bot ? 'font-style:italic;opacity:0.8;' : ''}">
            <span>${i + 1}. ${escapeHtmlTourney(r.icon)} ${escapeHtmlTourney(r.name)}${!r.done && !r.bot ? ` <small>(${r.stages}/5)</small>` : ''}</span>
            <span>${r.score}p · ${r.sec}sn</span>
          </div>`).join('') +
          `<div style="font-size:0.66rem;opacity:0.75;margin-top:4px;">${statusLine}${board.realCount < 3 ? ' · 🤖 Botlar yalnızca antrenman referansıdır.' : ''}</div>`;
      }

      if (tourneyCardBtn) tourneyCardBtn.style.display = tState.completed ? 'block' : 'none';
    }

    function escapeHtmlTourney(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }

    function openTourneyModal() {
      renderTourneyModal();
      if (tourneyOverlay) tourneyOverlay.classList.add('show');
      if (tourneyModal) tourneyModal.classList.add('show');
      syncTourneyCloud(false);
    }

    function closeTourneyModal() {
      if (tourneyOverlay) tourneyOverlay.classList.remove('show');
      if (tourneyModal) tourneyModal.classList.remove('show');
    }

    function updateTourneyInGameBanner() {
      if (!tourneyBanner) return;
      const lobbyShow = !tournamentMode && isInLobby() && getTourneyPhase() !== 'live';
      tourneyBanner.classList.toggle('show', tournamentMode || lobbyShow);
      tourneyBanner.classList.toggle('lobby', lobbyShow);
      if (btnTourneyExit) btnTourneyExit.textContent = tournamentMode ? '✕ Turnuvadan Çık' : '✕ Salondan Çık';

      if (tournamentMode) {
        const tState = ensureTourneyState();
        const st = TOURNAMENT_STAGES[tournamentStageIdx] || TOURNAMENT_STAGES[0];
        const sec = puzzleSolved ? tourneyFrozenSec : Math.max(0, Math.floor((Date.now() - puzzleStartTime) / 1000));
        const over = sec > st.targetSec;
        if (tourneyBannerTitle) tourneyBannerTitle.textContent = `🏆 Etap ${st.stage} / 5 · ${st.size}×${st.size}`;
        if (tourneyBannerTimer) tourneyBannerTimer.textContent =
          `⏱️ ${tPad2(Math.floor(sec / 60))}:${tPad2(sec % 60)} / ${st.targetSec}sn${over ? ' ⌛' : ''} · Puan: ${tState.totalScore || 0}`;
      } else if (lobbyShow) {
        if (tourneyBannerTitle) tourneyBannerTitle.textContent = '🟢 Bekleme Salonundasın · 20:00\'de otomatik başlar';
        if (tourneyBannerTimer) tourneyBannerTimer.textContent = `⏳ ${formatHMS(secsToNextStart())}`;
      }
    }

    function loadTournamentStage(stageIdx) {
      const tState = ensureTourneyState();
      tournamentStageIdx = Math.max(0, Math.min(TOURNAMENT_STAGES.length - 1, stageIdx));
      const st = TOURNAMENT_STAGES[tournamentStageIdx];

      // Not: Oyuncunun normal seviye ilerlemesi (gradeIdx/levelIdx) ve engel tercihi değiştirilmez.
      const verified = getVerifiedTourneyPuzzle(tournamentStageIdx, tState.date);
      const puzzle = verified.puzzle;
      if (!puzzle) {
        showToast('error', '!', 'Etap Üretilemedi', 'Turnuva etabı hazırlanamadı. Lütfen tekrar deneyin.');
        stopTournamentMode();
        return;
      }
      applyPuzzle(puzzle);

      // Süre sıfırlama koruması: Etaptan çıkıp tekrar girilse bile süre ilk başlangıçtan saymaya devam eder
      if (tState.stageStartIdx === tournamentStageIdx && tState.stageStartAt && tState.stageStartAt <= Date.now()) {
        puzzleStartTime = tState.stageStartAt;
      } else {
        tState.stageStartIdx = tournamentStageIdx;
        tState.stageStartAt = puzzleStartTime;
        saveAppData();
      }

      tourneyFrozenSec = 0;
      updateTourneyInGameBanner();
      noteEl.className = 'note teach';
      noteEl.textContent = `🏆 ${st.title} (${st.size}×${st.size}) · Hedef Süre: ${st.targetSec} sn · Taban Puan: ${st.basePts} · İpucusuz +40` +
        (verified.unique ? ' · ✔ Tek çözümlü soru' : '');
    }

    function startTournamentFlow() {
      const tState = ensureTourneyState();
      if (tState.completed || getTourneyPhase() !== 'live') {
        renderTourneyModal();
        return;
      }
      if (rushMode) stopRushMode(false);
      if (memoryMode) {
        memoryMode = false;
        if (btnMemory) btnMemory.classList.remove('active');
        clearInterval(memoryTimer);
        clearTimeout(memoryPeekTimeout);
        memoryHidden = false;
        tempRevealedLetter = null;
        updateMemoryBannerUI();
      }
      dailyMode = false;
      if (btnDaily) btnDaily.classList.remove('active');
      tState.officialRun = true;
      if (appData.tourneyLobbyFor === tState.date) appData.tourneyLobbyFor = null;
      saveAppData();
      tournamentMode = true;
      if (btnTournament) btnTournament.classList.add('active');
      closeTourneyModal();
      loadTournamentStage(tState.stageIdx || 0);
    }

    function onTourneyStartClick() {
      const tState = ensureTourneyState();
      if (getTourneyPhase() === 'live' && !tState.completed) {
        startTournamentFlow();
        return;
      }
      if (isInLobby()) {
        appData.tourneyLobbyFor = null;
        saveAppData();
        noteEl.className = 'note';
        noteEl.textContent = '🚪 Bekleme salonundan çıktın. İstediğin zaman tekrar girebilirsin.';
      } else {
        appData.tourneyLobbyFor = upcomingTourneyKey();
        saveAppData();
        playPathComplete();
        noteEl.className = 'note teach';
        noteEl.textContent = `🟢 Bekleme salonuna girdin! Turnuva ${formatHMS(secsToNextStart())} sonra (20:00) otomatik başlayacak. Bu sırada normal oynamaya devam edebilirsin.`;
      }
      renderTourneyModal();
      updateTourneyInGameBanner();
    }

    function stopTournamentMode() {
      tournamentMode = false;
      clearInterval(tournamentTimerInterval);
      if (btnTournament) btnTournament.classList.remove('active');
      updateTourneyInGameBanner();
      updateTourneyClockUI();
    }

    function onTournamentStageWin(elapsedSec, earnedStars) {
      clearInterval(tournamentTimerInterval);
      const tState = ensureTourneyState();
      const st = TOURNAMENT_STAGES[tournamentStageIdx] || TOURNAMENT_STAGES[0];
      const speedBonus = Math.max(0, (st.targetSec - elapsedSec) * 3);
      const noHintBonus = hintsUsed === 0 ? 40 : 0;
      const stagePts = st.basePts + speedBonus + noHintBonus;

      tState.stageScores[tournamentStageIdx] = stagePts;
      tState.stageTimes[tournamentStageIdx] = elapsedSec;
      tState.totalScore = tState.stageScores.reduce((a, b) => a + b, 0);
      tState.totalSec = tState.stageTimes.reduce((a, b) => a + b, 0);
      tourneyFrozenSec = elapsedSec;

      if (typeof ensureLeagueWeekSync === 'function') ensureLeagueWeekSync();
      appData.score = (appData.score || 0) + stagePts;
      appData.weeklyLeagueScore = (appData.weeklyLeagueScore || 0) + stagePts;

      playSuccess();
      spawnConfetti();
      updateStatsUI();
      updateTourneyInGameBanner();

      if (tournamentStageIdx + 1 < TOURNAMENT_STAGES.length) {
        tState.stageIdx = tournamentStageIdx + 1;
        saveAppData();
        toastNext.textContent = `🏆 ${tournamentStageIdx + 2}. Etaba Geç →`;
        showToast('success', '🏆', `${st.title} Tamamlandı!`,
          `Süre: ${elapsedSec} sn · Etap Puanı: +${stagePts} Puan (Hız Bonusu: +${speedBonus}, İpucusuz: +${noHintBonus}) · Toplam Turnuva Puanın: ${tState.totalScore}`,
          { showNext: true, stars: earnedStars });
      } else {
        tState.completed = true;
        tState.stageIdx = 0;
        saveAppData();
        playLevelUpFanfare();
        if (typeof syncPlayerToCloudLeaderboard === 'function') syncPlayerToCloudLeaderboard(false);
        toastNext.textContent = '🏅 Turnuva Sıralamasını Gör';
        showToast('success', '👑', 'TURNUVA ŞAMPİYONLUĞU TAMAMLANDI!',
          `5 Etabın tamamını başarıyla bitirdin! Toplam Turnuva Puanın: ${tState.totalScore} Puan · Toplam Süren: ${tState.totalSec} sn! 🎖️ Şampiyonluk kartını turnuva penceresinden indirebilirsin.`,
          { showNext: true, stars: 3 });
      }
      updateTourneyClockUI();
      syncTourneyCloud(true);
    }

    /* ---------- 🎖️ ŞAMPİYONLUK KARTI (PNG indir / paylaş) ---------- */
    function roundRectPath(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function buildChampionCardCanvas() {
      const tState = ensureTourneyState();
      const prof = (appData.profiles && appData.profiles[appData.activeProfileIdx || 0]) || { icon: '🦊', name: 'Oyuncu' };
      const board = buildTourneyBoard(tState);
      const W = 1080, H = 1350;
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d');
      const font = (w, s) => `${w} ${s}px "Segoe UI", Arial, "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;

      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#311b92'); g.addColorStop(0.55, '#6a1b9a'); g.addColorStop(1, '#e65100');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(255,215,64,0.9)'; ctx.lineWidth = 10;
      roundRectPath(ctx, 30, 30, W - 60, H - 60, 40); ctx.stroke();

      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
      ctx.font = font('900', 46); ctx.fillText('ABC BAĞLAMACA · MiniBilge', W / 2, 110);
      ctx.font = font('800', 34); ctx.fillStyle = '#ffe082'; ctx.fillText(`20:00 Akşam Turnuvası · ${tState.date}`, W / 2, 165);

      ctx.font = font('400', 170); ctx.fillStyle = '#fff'; ctx.fillText('🏆', W / 2, 320);
      ctx.font = font('900', 70); ctx.fillText('ŞAMPİYONLUK KARTI', W / 2, 470);

      ctx.font = font('800', 60); ctx.fillStyle = '#fff59d';
      ctx.fillText(`${prof.icon || '🦊'} ${String(prof.name || 'Oyuncu').slice(0, 20)}`, W / 2, 565);

      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      roundRectPath(ctx, 110, 625, W - 220, 190, 30); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = font('900', 96);
      ctx.fillText(`${tState.totalScore} PUAN`, W / 2, 695);
      ctx.font = font('700', 38);
      const rankTxt = board.online && board.realRank ? ` · ${board.realRank}. sıra (${board.realCount} oyuncu)` : '';
      ctx.fillText(`⏱️ Toplam ${tState.totalSec} sn${rankTxt}`, W / 2, 775);

      ctx.textAlign = 'left'; ctx.font = font('700', 36);
      TOURNAMENT_STAGES.forEach((st, i) => {
        const y = 880 + i * 72;
        ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.16)';
        roundRectPath(ctx, 110, y - 30, W - 220, 60, 16); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText(`✅ Etap ${st.stage} · ${st.size}×${st.size}`, 140, y);
        ctx.textAlign = 'right';
        ctx.fillText(`+${tState.stageScores[i] || 0}p · ${tState.stageTimes[i] || 0} sn`, W - 140, y);
        ctx.textAlign = 'left';
      });

      ctx.textAlign = 'center'; ctx.fillStyle = '#ffe082'; ctx.font = font('700', 32);
      ctx.fillText('Her akşam 20:00\'de yeni turnuva! hkhk-02.github.io/abc-baglamaca', W / 2, H - 95);
      return cv;
    }

    async function shareChampionCard() {
      try {
        const cv = buildChampionCardCanvas();
        const tState = ensureTourneyState();
        const fileName = `ABC-Baglamaca-Sampiyonluk-${tState.date}.png`;
        const blob = await new Promise(res => cv.toBlob(res, 'image/png'));
        if (!blob) throw new Error('blob');
        const file = (typeof File === 'function') ? new File([blob], fileName, { type: 'image/png' }) : null;
        if (file && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
          try {
            await navigator.share({ files: [file], title: 'ABC Bağlamaca Şampiyonluk Kartı', text: `20:00 Turnuvasında ${tState.totalScore} puan topladım! 🏆` });
            return;
          } catch (err) {
            if (err && err.name === 'AbortError') return;
          }
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = fileName;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        noteEl.className = 'note teach';
        noteEl.textContent = '🎖️ Şampiyonluk kartın PNG olarak indirildi!';
      } catch (_) {
        showToast('error', '!', 'Kart Oluşturulamadı', 'Bu tarayıcı kart oluşturmayı desteklemiyor olabilir.');
      }
    }

    function advanceTournamentStageOrFinish() {
      const tState = ensureTourneyState();
      if (tState.completed) {
        stopTournamentMode();
        newPuzzle();
        openTourneyModal();
      } else {
        loadTournamentStage(tState.stageIdx || 0);
      }
    }

    if (btnTournament) {
      btnTournament.addEventListener('click', () => {
        playClick();
        openTourneyModal();
      });
    }
    if (tourneyClose) tourneyClose.addEventListener('click', () => { playClick(); closeTourneyModal(); });
    if (tourneyOverlay) tourneyOverlay.addEventListener('click', closeTourneyModal);
    if (tourneyStartBtn) tourneyStartBtn.addEventListener('click', () => { playClick(); onTourneyStartClick(); });
    if (tourneyCardBtn) tourneyCardBtn.addEventListener('click', () => { playClick(); shareChampionCard(); });
    if (btnTourneyExit) {
      btnTourneyExit.addEventListener('click', () => {
        playClick();
        if (tournamentMode) {
          stopTournamentMode();
          newPuzzle();
          noteEl.className = 'note';
          noteEl.textContent = '🏆 Turnuvadan çıktın. İlerlemen kaydedildi; 21:00\'e kadar kaldığın etaptan devam edebilirsin (etap süren işlemeye devam eder).';
        } else {
          appData.tourneyLobbyFor = null;
          saveAppData();
          noteEl.className = 'note';
          noteEl.textContent = '🚪 Bekleme salonundan çıktın.';
        }
        updateTourneyInGameBanner();
        updateTourneyClockUI();
      });
    }

    /* Klavye Kısayolları (Ctrl+Z: Geri Al, Escape: Modal/İpucu Kapat) */
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if ((seedModal && seedModal.classList.contains('show')) || pdfModal.classList.contains('show')) return;
        e.preventDefault();
        btnUndo.click();
        return;
      }
      if (e.key === 'Escape') {
        if (tourneyModal && tourneyModal.classList.contains('show')) { closeTourneyModal(); return; }
        if (typeof adventureModal !== 'undefined' && adventureModal && adventureModal.classList.contains('show')) { closeAdventureModal(); return; }
        if (typeof jigsawModal !== 'undefined' && jigsawModal && jigsawModal.classList.contains('show')) { closeJigsawModal(); return; }
        if (typeof creatorModal !== 'undefined' && creatorModal && creatorModal.classList.contains('show')) { closeCreatorModal(); return; }
        if (badgeModal && badgeModal.classList.contains('show')) { closeBadgeModal(); return; }
        if (seedModal && seedModal.classList.contains('show')) { closeSeedModal(); return; }
        if (pdfModal.classList.contains('show')) { closePdfModal(); return; }
        if (overlay.classList.contains('show')) { hideToast(); return; }
        if (hintArmed) { hintArmed = false; updateHintUI(); updateHalos(); return; }
        if (document.body.classList.contains('main-fullscreen-mode')) { setMainFullscreen(false); return; }
      }
    });

    /* ABC Bağlamaca Ana Sayfa Tam Ekran Modu Kontrolü */
    const btnMainFullscreen = document.getElementById('btnMainFullscreen');
    function syncMainFullscreenUI() {
      const isFs = document.body.classList.contains('main-fullscreen-mode');
      if (btnMainFullscreen) {
        btnMainFullscreen.classList.toggle('active', isFs);
        btnMainFullscreen.innerHTML = isFs ? '↙️ Tam Ekrandan Çık' : '⛶ Tam Ekran';
      }
      if (typeof btnJigsawFullscreen !== 'undefined' && btnJigsawFullscreen) {
        btnJigsawFullscreen.innerHTML = document.fullscreenElement ? '↙️ Tam Ekrandan Çık' : '⛶ Tam Ekran';
      }
      resizeBoard();
      render();
    }
    function setMainFullscreen(enable) {
      if (enable) {
        document.body.classList.add('main-fullscreen-mode');
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } else {
        document.body.classList.remove('main-fullscreen-mode');
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
      syncMainFullscreenUI();
    }
    if (btnMainFullscreen) {
      btnMainFullscreen.addEventListener('click', () => {
        playClick();
        const isCurrentlyFs = document.body.classList.contains('main-fullscreen-mode');
        setMainFullscreen(!isCurrentlyFs);
      });
    }
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && document.body.classList.contains('main-fullscreen-mode')) {
        document.body.classList.remove('main-fullscreen-mode');
      } else if (document.fullscreenElement && !(typeof jigsawModal !== 'undefined' && jigsawModal && jigsawModal.classList.contains('show'))) {
        document.body.classList.add('main-fullscreen-mode');
      }
      syncMainFullscreenUI();
    });

    /* Mobil / Android Geri Tuşu Koruması (Uygulamadan kazara çıkışı önler) */
    try { history.replaceState({ page: 'game' }, ''); } catch (_) {}
    window.addEventListener('popstate', () => {
      if (tourneyModal && tourneyModal.classList.contains('show')) { closeTourneyModal(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (typeof adventureModal !== 'undefined' && adventureModal && adventureModal.classList.contains('show')) { closeAdventureModal(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (typeof jigsawModal !== 'undefined' && jigsawModal && jigsawModal.classList.contains('show')) { closeJigsawModal(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (typeof creatorModal !== 'undefined' && creatorModal && creatorModal.classList.contains('show')) { closeCreatorModal(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (badgeModal && badgeModal.classList.contains('show')) { closeBadgeModal(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (seedModal && seedModal.classList.contains('show')) { closeSeedModal(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (pdfModal.classList.contains('show')) { closePdfModal(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (overlay.classList.contains('show')) { hideToast(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (tournamentMode) { stopTournamentMode(); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
      if (rushMode) { stopRushMode(false); try { history.pushState({ page: 'game' }, ''); } catch (_) {} return; }
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeBoard();
        render();
      }, 120);
    });

    /* 📄 DETAYLI PDF VE RESMİ TURNUVA KİTAPÇIĞI MOTORU */
    const btnPdf = document.getElementById('btnPdf');
    const pdfOverlay = document.getElementById('pdfOverlay');
    const pdfModal = document.getElementById('pdfModal');
    const pdfDocType = document.getElementById('pdfDocType');
    const pdfTournamentPresetField = document.getElementById('pdfTournamentPresetField');
    const pdfTournamentPreset = document.getElementById('pdfTournamentPreset');
    const pdfScopeField = document.getElementById('pdfScopeField');
    const pdfCountField = document.getElementById('pdfCountField');
    const pdfCustomTitle = document.getElementById('pdfCustomTitle');
    const pdfScope = document.getElementById('pdfScope');
    const pdfCount = document.getElementById('pdfCount');
    const pdfPerPage = document.getElementById('pdfPerPage');
    const pdfWithObstacles = document.getElementById('pdfWithObstacles');
    const pdfShowMeta = document.getElementById('pdfShowMeta');
    const pdfAnswers = document.getElementById('pdfAnswers');
    const pdfSummary = document.getElementById('pdfSummary');
    const pdfCancel = document.getElementById('pdfCancel');
    const pdfCreate = document.getElementById('pdfCreate');
    const printArea = document.getElementById('printArea');

    if (tourneyPdfQuick) {
      tourneyPdfQuick.addEventListener('click', () => {
        playClick();
        closeTourneyModal();
        if (pdfDocType) pdfDocType.value = 'tournament';
        if (pdfTournamentPreset) pdfTournamentPreset.value = 'today20';
        openPdfModal();
      });
    }

    const PRINT_RULES =
      'ABC Bağlamaca, zekâ oyunlarının uzamsal algı ve mantıksal çıkarım türlerindendir. Temel amaç tüm noktaları ' +
      'kullanarak aynı harfleri/sembolleri birbirine bağlamaktır. Yalnızca yatay ve dikey çizgiler kullanılır; ' +
      'çizgiler birbirini kesmez, başka bir harfin veya engelin üzerinden geçmez ve bitişte tek bir nokta bile açıkta kalmaz.';

    const LAYOUT = {
      1: { cols: 1, svgMax: '115mm' },
      2: { cols: 1, svgMax: '90mm' },
      4: { cols: 2, svgMax: '74mm' },
      6: { cols: 2, svgMax: '58mm' }
    };

    function puzzleSvgMarkup(puzzle, withSolution) {
      const n = puzzle.s;
      const gap = 10;
      const padU = 7;
      const W = padU * 2 + (n - 1) * gap;
      const fontSize = gap * 0.62;
      const strokeW = gap * 0.3;
      const dotR = 0.8;
      const obsSet = new Set(puzzle.obstacles || []);
      const xy = i => ({ x: padU + (i % n) * gap, y: padU + Math.floor(i / n) * gap });

      let lines = '';
      if (withSolution) {
        puzzle.sol.forEach((cells, li) => {
          const color = PATH_COLORS[LETTERS[li]];
          const pts = cells.map(i => { const p = xy(i); return p.x + ',' + p.y; }).join(' ');
          lines += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="${strokeW}"` +
                   ' stroke-linecap="round" stroke-linejoin="round"/>';
        });
      }

      const epMap = new Map();
      puzzle.sol.forEach((cells, li) => {
        epMap.set(cells[0], LETTERS[li]);
        epMap.set(cells[cells.length - 1], LETTERS[li]);
      });

      let dots = '';
      let texts = '';
      const obsSize = gap * 0.56;
      for (let i = 0; i < n * n; i++) {
        const p = xy(i);
        if (obsSet.has(i)) {
          dots += `<rect x="${p.x - obsSize / 2}" y="${p.y - obsSize / 2}" width="${obsSize}" height="${obsSize}" rx="1.4" fill="#37474f"/>`;
          continue;
        }
        const letter = epMap.get(i);
        if (letter) {
          const sym = getSymbol(letter, true);
          const outline = withSolution
            ? ' stroke="#fff" stroke-width="1.5" stroke-linejoin="round" paint-order="stroke"'
            : '';
          texts += `<text x="${p.x}" y="${p.y}" font-size="${fontSize}"` +
                   ' font-family="Arial, Helvetica, sans-serif" font-weight="bold" fill="#231f20"' +
                   ` text-anchor="middle" dominant-baseline="central"${outline}>${sym}</text>`;
        } else {
          dots += `<circle cx="${p.x}" cy="${p.y}" r="${dotR}" fill="#231f20"/>`;
        }
      }

      return `<svg viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg">${lines}${dots}${texts}</svg>`;
    }

    function buildPrintItems(scope, count, opts = {}) {
      const items = [];
      const docType = opts.docType || 'worksheet';
      const preset = opts.preset || 'today20';
      const useObs = !!opts.withObstacles;

      // Adil yarışma: Bugünün seti yalnızca turnuva kapandıktan (21:00) veya oyuncu bitirdikten sonra basılabilir.
      // Öncesinde en son tamamlanmış (dünkü) turnuva seti basılır; böylece sorular önceden sızdırılamaz.
      function printableTourneyDateKey() {
        const tState = ensureTourneyState();
        if (tState.completed || getTourneyPhase() === 'closed') return tState.date;
        const y = new Date();
        y.setDate(y.getDate() - 1);
        return dateKeyOf(y);
      }

      if (docType === 'tournament' && preset !== 'custom_scope') {
        if (preset === 'today20') {
          const todayKey = printableTourneyDateKey();
          TOURNAMENT_STAGES.forEach((st, idx) => {
            const verified = getVerifiedTourneyPuzzle(idx, todayKey);
            const puzzle = verified.puzzle;
            if (puzzle) {
              items.push({
                puzzle,
                caption: `🏆 ${todayKey} · ${st.title} (${st.size}×${st.size} · ${st.pairs} Çift · Kod: #${puzzle.code}${verified.unique ? ' · Tek Çözümlü' : ''})`,
                meta: `Puan Değeri: ${st.basePts} Puan | İdeal Süre: ${st.targetSec} sn | Hakem Onayı: [   ]`
              });
            }
          });
          return items;
        }

        const specs = preset === 'school_elem'
          ? [
              { title: 'Eleme Turu Soru 1', size: 4, pairs: 3, gi: 0, li: 1, pts: 100, sec: 25 },
              { title: 'Eleme Turu Soru 2', size: 4, pairs: 4, gi: 0, li: 3, pts: 120, sec: 30 },
              { title: 'Eleme Turu Soru 3', size: 5, pairs: 4, gi: 1, li: 1, pts: 150, sec: 35 },
              { title: 'Eleme Turu Soru 4', size: 5, pairs: 5, gi: 1, li: 3, pts: 180, sec: 45 },
              { title: 'Eleme Turu Soru 5', size: 6, pairs: 5, gi: 2, li: 1, pts: 220, sec: 55 },
              { title: 'Eleme Turu Soru 6 (Final)', size: 6, pairs: 6, gi: 2, li: 3, pts: 250, sec: 65 }
            ]
          : [
              { title: 'Şampiyona Final Soru 1', size: 6, pairs: 5, gi: 2, li: 2, pts: 150, sec: 45 },
              { title: 'Şampiyona Final Soru 2', size: 6, pairs: 6, gi: 2, li: 4, pts: 180, sec: 55 },
              { title: 'Şampiyona Final Soru 3', size: 7, pairs: 6, gi: 3, li: 2, pts: 220, sec: 70 },
              { title: 'Şampiyona Final Soru 4', size: 7, pairs: 7, gi: 3, li: 4, pts: 260, sec: 80 },
              { title: 'Şampiyona Final Soru 5', size: 8, pairs: 6, gi: 4, li: 2, pts: 300, sec: 95 },
              { title: 'Şampiyona Final Soru 6 (Büyük Final)', size: 8, pairs: 7, gi: 5, li: 2, pts: 350, sec: 110 }
            ];

        specs.forEach((sp, i) => {
          const puzzle = generatePuzzle(sp.size, sp.pairs, 0.65, null, 45, {
            gi: sp.gi, li: sp.li, withObstacles: useObs
          });
          if (puzzle) {
            items.push({
              puzzle,
              caption: `🏆 ${sp.title} (${sp.size}×${sp.size} · ${sp.pairs} Çift · #${puzzle.code})`,
              meta: `Puan Değeri: ${sp.pts} Puan | Hedef Süre: ${sp.sec} sn | Süre/Puan: ............`
            });
          }
        });
        return items;
      }

      function addLevel(gi, li, n) {
        const cfg = GRADES[gi].levels[li];
        const v = variantFor(gi, li, solvedCount(gi, li));
        const range = difficultyRange(gi, li);
        const stars = '★'.repeat(Math.min(5, gi + 1)) + '☆'.repeat(Math.max(0, 4 - gi));
        const targetSec = goldTargetSec(gi, li);
        for (let i = 0; i < n; i++) {
          const p = n === 1
            ? percentileFor(gi, li, solvedCount(gi, li))
            : range.start + (range.max - range.start) * (i / (n - 1));
          const puzzle = generatePuzzle(v.size, v.pairs, p, null, 40, {
            gi, li, withObstacles: useObs
          });
          if (!puzzle) continue;
          const basePts = (gi + 1) * 50 + li * 15;
          items.push({
            puzzle,
            caption: `${GRADES[gi].label} · Seviye ${cfg.level} · Soru ${i + 1} (${v.size}×${v.size} · #${puzzle.code})`,
            meta: `Zorluk: ${stars} | Hedef Süre: ${targetSec} sn | Puan: ${basePts}p | Çözüm Süresi: .........`
          });
        }
      }

      if (scope === 'question') {
        const sol = letters.map(l => solution[l].map(([r, c]) => r * size + c));
        const obsIdx = obstacles.map(([r, c]) => r * size + c);
        const targetSec = goldTargetSec(gradeIdx, levelIdx);
        items.push({
          puzzle: { s: size, sol, obstacles: obsIdx, code: currentSeedCode },
          caption: `${GRADES[gradeIdx].label} · Seviye ${levelCfg().level} · Soru #${currentSeedCode} (${size}×${size})`,
          meta: `Hedef Süre: ${targetSec} sn | Puan Değeri: ${puzzleScore || 100}p | Çözüm Süresi: .........`
        });
      } else if (scope === 'level') {
        addLevel(gradeIdx, levelIdx, count);
      } else if (scope === 'grade') {
        GRADES[gradeIdx].levels.forEach((_, li) => addLevel(gradeIdx, li, count));
      } else {
        GRADES.forEach((g, gi) => g.levels.forEach((_, li) => addLevel(gi, li, count)));
      }
      return items;
    }

    function chunk(arr, n) {
      const out = [];
      for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
      return out;
    }

    function buildPrintPages(items, perPage, withAnswers, opts = {}) {
      const layout = LAYOUT[perPage] || LAYOUT[4];
      const pages = chunk(items, perPage);
      const totalPages = pages.length * (withAnswers ? 2 : 1);
      const isTourney = opts.docType === 'tournament';
      const showMeta = opts.showMeta !== false;
      const customTitle = (opts.customTitle || '').trim();
      let pageNo = 0;
      let html = '';

      function renderSet(showSolution) {
        pages.forEach((group, gi) => {
          pageNo++;
          html += '<section class="print-page">';
          html += '<div class="print-banner">' +
                  `<div class="t1">${customTitle ? customTitle.toUpperCase() : (isTourney ? 'ULUSAL AKIL VE ZEKA OYUNLARI TURNUVASI' : 'ZEKA VE AKIL OYUNLARI ETKİNLİK KAĞIDI')}</div>` +
                  `<div class="t2">ABC BAĞLAMACA ${isTourney ? '· RESMİ TURNUVA KİTAPÇIĞI' : ''}</div></div>`;

          if (showSolution) {
            html += '<div style="text-align:center">' +
                    '<span class="print-answer-tag">CEVAP ANAHTARI VE HAKEM KONTROL ŞABLONU</span></div>';
          } else if (gi === 0) {
            if (isTourney) {
              html += '<div class="print-student-info" style="background:#fffbeb;border:1.5px solid #d97706;padding:6px 10px;border-radius:6px;">' +
                      '<span><strong>Yarışmacı Adı Soyadı:</strong> ....................................</span>' +
                      '<span><strong>Okul / Sınıf / Masa No:</strong> ......................</span>' +
                      '<span><strong>Başlama - Bitiş Saati:</strong> ...... : ...... / ...... : ......</span>' +
                      '<span><strong>Hakem İmza / Toplam Puan:</strong> .................</span>' +
                      '</div>';
            } else {
              html += '<div class="print-student-info">' +
                      '<span>Adı Soyadı: ........................................</span>' +
                      '<span>Sınıfı / No: ....................</span>' +
                      '<span>Tarih: .... / .... / 202..</span>' +
                      '<span>Puan: ..........</span>' +
                      '</div>';
            }
            html += `<div class="print-rules">${PRINT_RULES}</div>`;
          }

          html += `<div class="print-grid" style="grid-template-columns:repeat(${layout.cols},1fr)">`;
          group.forEach(item => {
            html += '<div class="print-card">' +
                    `<div class="cap">${item.caption}</div>` +
                    (showMeta && item.meta ? `<div style="font-size:7.5pt;color:#475569;margin-bottom:1.5mm;font-weight:700;">${item.meta}</div>` : '') +
                    `<div class="frame" style="max-width:${layout.svgMax}">` +
                    puzzleSvgMarkup(item.puzzle, showSolution) +
                    '</div></div>';
          });
          html += '</div>';

          html += '<div class="print-foot">' +
                  `<span>MiniBilge · ${isTourney ? 'ABC Bağlamaca Resmi Turnuva Kitapçığı' : 'ABC Bağlamaca Etkinliği'}</span>` +
                  `<span>Sayfa ${pageNo} / ${totalPages}</span></div>`;
          html += '</section>';
        });
      }

      renderSet(false);
      if (withAnswers) renderSet(true);
      return html;
    }

    function scopeCount(scope, count) {
      if (scope === 'question') return 1;
      if (scope === 'level') return count;
      if (scope === 'grade') return count * GRADES[gradeIdx].levels.length;
      return count * GRADES.reduce((s, g) => s + g.levels.length, 0);
    }

    function scopeLabel(scope) {
      const cfg = levelCfg();
      const label = GRADES[gradeIdx].label;
      if (scope === 'question') return `${label} · Seviye ${cfg.level} · Ekrandaki soru`;
      if (scope === 'level') return `${label} · Seviye ${cfg.level}`;
      if (scope === 'grade') return `${label} Grubu`;
      return 'Tüm Zorluklar';
    }

    function buildJigsawPrintPages(withAnswers, opts = {}) {
      const customTitle = (opts.customTitle || '').trim();
      const totalPages = withAnswers ? 2 : 1;
      const specs = [
        { title: '1. Parça Birleştirme (Kes-Yapıştır): Sevimli Kaplumbağa (Kafa, Gövde, Ayaklar · 2×2)', rows: 2, cols: 2, style: 1, scene: 0, order: [2, 0, 3, 1] },
        { title: '2. Sayı Sıralamalı Şerit Yapboz: Ritmik Sayma Şeridi (1–6 Dikey Dilimler)', rows: 1, cols: 6, style: 2, scene: 0, order: [3, 0, 5, 1, 4, 2] },
        { title: '3. Kare Kesimli Çalışma Kağıdı: Makasla Kolay Kesilen 4×4 Izgara', rows: 4, cols: 4, style: 3, scene: 1, order: [5, 0, 11, 2, 14, 7, 1, 9, 12, 4, 15, 6, 3, 10, 8, 13] },
        { title: '4. Figürlü Klasik Kilitli Şablon: Kırmızı Araba & Sevimli Köpek (3×3)', rows: 3, cols: 3, style: 0, scene: 1, order: [5, 2, 7, 0, 8, 3, 1, 6, 4] }
      ];

      function renderSpecData(sp) {
        const W = 252, H = 252;
        const cv = document.createElement('canvas');
        cv.width = W; cv.height = H;
        const ctx = cv.getContext('2d');
        if (sp.style === 0 && typeof drawStyle0Scene === 'function') drawStyle0Scene(ctx, W, H, sp.scene, sp.rows, sp.cols);
        else if (sp.style === 1 && typeof drawStyle1TangramMandala === 'function') drawStyle1TangramMandala(ctx, W, H, sp.scene, sp.rows, sp.cols);
        else if (sp.style === 2 && typeof drawStyle2PipeTracks === 'function') drawStyle2PipeTracks(ctx, W, H, sp.rows, sp.cols, sp.scene);
        else if (sp.style === 4 && typeof drawStyle4LiveAbcPuzzle === 'function') drawStyle4LiveAbcPuzzle(ctx, W, H);
        else if (typeof drawStyle3PatternMatrix === 'function') drawStyle3PatternMatrix(ctx, W, H, sp.rows, sp.cols, sp.scene);

        const fullUrl = cv.toDataURL('image/png');
        const tileW = Math.floor(W / sp.cols);
        const tileH = Math.floor(H / sp.rows);
        const pieces = [];
        for (let pId = 0; pId < sp.rows * sp.cols; pId++) {
          const r = Math.floor(pId / sp.cols), c = pId % sp.cols;
          const pCv = document.createElement('canvas');
          pCv.width = tileW; pCv.height = tileH;
          const pCtx = pCv.getContext('2d');
          pCtx.drawImage(cv, c * tileW, r * tileH, tileW, tileH, 0, 0, tileW, tileH);
          pieces.push(pCv.toDataURL('image/png'));
        }
        return { fullUrl, pieces };
      }

      const rendered = specs.map(sp => ({ sp, data: renderSpecData(sp) }));
      let html = '';

      html += '<section class="print-page">';
      html += '<div class="print-banner">' +
              `<div class="t1">${customTitle ? customTitle.toUpperCase() : 'ÇOCUK YAPBOZ AKADEMİSİ · KES-YAPIŞTIR ETKİNLİK KAĞIDI'}</div>` +
              '<div class="t2">ABC BAĞLAMACA · UZAMSAL ALGI VE PARÇA-BÜTÜN EŞLEŞTİRME</div></div>';
      html += '<div class="print-student-info">' +
              '<span>Adı Soyadı: ........................................</span>' +
              '<span>Sınıfı / No: ....................</span>' +
              '<span>Tarih: .... / .... / 202..</span>' +
              '<span>Puan: ..........</span></div>';
      html += '<div class="print-rules">✂️ <strong>Yönerge:</strong> Sağ taraftaki kesikli çizgili kutularda yer alan karışık yapboz parçalarını makasla dikkatlice kes. Sol taraftaki <strong>Hedef Yapboz Çerçevesi</strong> içine doğru sırayla yapıştırarak resmi ve yolları tamamla!</div>';

      html += '<div class="print-grid" style="grid-template-columns:1fr;gap:4mm;">';
      rendered.forEach(({ sp, data }) => {
        const total = sp.rows * sp.cols;
        let slotsHtml = '';
        for (let i = 0; i < total; i++) {
          slotsHtml += `<div style="border:1.5px dashed #64748b;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:800;color:#94a3b8;">${i + 1}</div>`;
        }
        let cutTilesHtml = '';
        sp.order.forEach(pIdx => {
          cutTilesHtml += `<div style="border:1.8px dashed #d97706;padding:1.2mm;border-radius:2mm;background:#fff;display:flex;align-items:center;justify-content:center;">
            <img src="${data.pieces[pIdx]}" alt="Parça" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:1mm;"/>
          </div>`;
        });

        html += `<div class="print-card" style="padding:2.5mm 3.5mm;">
          <div class="cap" style="margin-bottom:1.5mm;">🧩 ${sp.title}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:5mm;align-items:center;width:100%;">
            <div style="text-align:center;">
              <div style="font-size:7.5pt;font-weight:800;color:#1e3a8a;margin-bottom:1mm;">📌 HEDEF YAPBOZ ÇERÇEVESİ (BURAYA YAPIŞTIR)</div>
              <div style="position:relative;width:44mm;height:44mm;margin:0 auto;border:2px solid #1e3a8a;border-radius:2mm;overflow:hidden;">
                <img src="${data.fullUrl}" alt="İpucu" style="position:absolute;inset:0;width:100%;height:100%;opacity:0.2;filter:grayscale(20%);"/>
                <div style="position:relative;z-index:2;display:grid;grid-template-columns:repeat(${sp.cols},1fr);grid-template-rows:repeat(${sp.rows},1fr);width:100%;height:100%;">${slotsHtml}</div>
              </div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:7.5pt;font-weight:800;color:#b45309;margin-bottom:1mm;">✂️ KESİLECEK KARIŞIK PARÇALAR</div>
              <div style="display:grid;grid-template-columns:repeat(${sp.cols},1fr);grid-template-rows:repeat(${sp.rows},1fr);gap:1.8mm;width:44mm;height:44mm;margin:0 auto;">${cutTilesHtml}</div>
            </div>
          </div>
        </div>`;
      });
      html += '</div>';
      html += `<div class="print-foot"><span>MiniBilge · Çocuk Yapboz Akademisi Kes-Yapıştır Etkinliği</span><span>Sayfa 1 / ${totalPages}</span></div>`;
      html += '</section>';

      if (withAnswers) {
        html += '<section class="print-page">';
        html += '<div class="print-banner">' +
                `<div class="t1">${customTitle ? customTitle.toUpperCase() : 'ÇOCUK YAPBOZ AKADEMİSİ · CEVAP ANAHTARI'}</div>` +
                '<div class="t2">TAMAMLANMIŞ YAPBOZ GÖRÜNTÜLERİ</div></div>';
        html += '<div style="text-align:center"><span class="print-answer-tag">CEVAP ANAHTARI VE TAMAMLANMIŞ GÖRSELLER</span></div>';
        html += '<div class="print-grid" style="grid-template-columns:repeat(2,1fr);gap:5mm;margin-top:3mm;">';
        rendered.forEach(({ sp, data }) => {
          html += `<div class="print-card">
            <div class="cap">✅ ${sp.title}</div>
            <div class="frame" style="max-width:68mm;border:2px solid #1e3a8a;border-radius:3mm;overflow:hidden;">
              <img src="${data.fullUrl}" alt="Cevap" style="width:100%;height:auto;display:block;"/>
            </div>
          </div>`;
        });
        html += '</div>';
        html += `<div class="print-foot"><span>MiniBilge · Çocuk Yapboz Akademisi Cevap Anahtarı</span><span>Sayfa 2 / 2</span></div>`;
        html += '</section>';
      }
      return html;
    }

    function updatePdfSummary() {
      const docType = pdfDocType ? pdfDocType.value : 'worksheet';
      const preset = pdfTournamentPreset ? pdfTournamentPreset.value : 'today20';
      const isTourneyPreset = docType === 'tournament' && preset !== 'custom_scope';
      const isJigsawDoc = docType === 'jigsaw';

      if (pdfTournamentPresetField) {
        pdfTournamentPresetField.style.display = docType === 'tournament' ? 'block' : 'none';
      }
      if (pdfScopeField) pdfScopeField.style.display = (isTourneyPreset || isJigsawDoc) ? 'none' : '';
      if (pdfCountField) pdfCountField.style.display = (isTourneyPreset || isJigsawDoc) ? 'none' : '';

      if (isJigsawDoc) {
        const jPages = pdfAnswers.checked ? 2 : 1;
        pdfCount.disabled = true;
        pdfSummary.textContent = `🧩 Kes-Yapıştır Yapboz Etkinliği · 4 Farklı Stil (2×2 → 3×3) · ${jPages} sayfa`;
        return;
      }

      const scope = pdfScope.value;
      const count = parseInt(pdfCount.value, 10);
      const perPage = parseInt(pdfPerPage.value, 10);
      let total = scopeCount(scope, count);
      let labelText = scopeLabel(scope);

      if (isTourneyPreset) {
        if (preset === 'today20') {
          total = 5;
          const tsP = ensureTourneyState();
          const todayOk = tsP.completed || getTourneyPhase() === 'closed';
          labelText = todayOk ? `🏆 Bugünün Turnuva Seti (5 Etap)` : `🏆 Dünkü Turnuva Seti (bugünkü set 21:00'den sonra açılır)`;
        } else if (preset === 'school_elem') {
          total = 6;
          labelText = `🏆 İlkokul / Ortaokul Eleme Kitapçığı`;
        } else {
          total = 6;
          labelText = `🏆 Okul Şampiyonası Final Kitapçığı`;
        }
      }

      const pages = Math.ceil(total / perPage) * (pdfAnswers.checked ? 2 : 1);
      pdfCount.disabled = (scope === 'question' || isTourneyPreset);
      pdfSummary.textContent = `${labelText} · ${total} bulmaca · ${pages} sayfa`;
    }

    function openPdfModal() {
      if (pdfWithObstacles) pdfWithObstacles.checked = !!obstacleMode;
      updatePdfSummary();
      pdfOverlay.classList.add('show');
      pdfModal.classList.add('show');
    }
    function closePdfModal() {
      pdfOverlay.classList.remove('show');
      pdfModal.classList.remove('show');
    }

    function createPdf() {
      const docType = pdfDocType ? pdfDocType.value : 'worksheet';
      const preset = pdfTournamentPreset ? pdfTournamentPreset.value : 'today20';
      const customTitle = pdfCustomTitle ? pdfCustomTitle.value : '';
      const scope = pdfScope.value;
      const count = parseInt(pdfCount.value, 10);
      const perPage = parseInt(pdfPerPage.value, 10);
      const withAnswers = pdfAnswers.checked;
      const withObstacles = pdfWithObstacles ? pdfWithObstacles.checked : obstacleMode;
      const showMeta = pdfShowMeta ? pdfShowMeta.checked : true;

      pdfCreate.disabled = true;
      pdfCreate.textContent = 'Hazırlanıyor…';

      setTimeout(() => {
        if (docType === 'jigsaw') {
          printArea.innerHTML = buildJigsawPrintPages(withAnswers, { customTitle });
        } else {
          const items = buildPrintItems(scope, count, { docType, preset, withObstacles });
          printArea.innerHTML = buildPrintPages(items, perPage, withAnswers, {
            docType,
            customTitle,
            showMeta
          });
        }

        const baseName = docType === 'tournament'
          ? 'ABC-Baglamaca-Turnuva-Kitapcigi'
          : (docType === 'jigsaw' ? 'ABC-Baglamaca-Kes-Yapistir-Yapboz-Etkinligi' : ('ABC-Baglamaca-' + scopeLabel(scope)));
        const safeTitle = (baseName + (withAnswers ? '-cevapli' : ''))
          .replace(/[^\w\sğüşıöçĞÜŞİÖÇ.-]/g, '')
          .replace(/\s+/g, '-');

        const prevTitle = document.title;
        document.title = safeTitle;
        pdfCreate.disabled = false;
        pdfCreate.textContent = '📄 PDF Oluştur ve Yazdır';
        closePdfModal();

        setTimeout(() => {
          window.print();
          document.title = prevTitle;
        }, 60);
      }, 40);
    }

    if (btnPdf) btnPdf.addEventListener('click', () => { playClick(); requireParentGate(() => openPdfModal()); });
    pdfCancel.addEventListener('click', () => { playClick(); closePdfModal(); });
    pdfOverlay.addEventListener('click', closePdfModal);
    pdfCreate.addEventListener('click', createPdf);
    if (pdfDocType) pdfDocType.addEventListener('change', updatePdfSummary);
    if (pdfTournamentPreset) pdfTournamentPreset.addEventListener('change', updatePdfSummary);
    pdfScope.addEventListener('change', updatePdfSummary);
    pdfCount.addEventListener('change', updatePdfSummary);
    pdfPerPage.addEventListener('change', updatePdfSummary);
    pdfAnswers.addEventListener('change', updatePdfSummary);
    window.addEventListener('afterprint', () => { printArea.innerHTML = ''; });

    /* =========================================================================
       PEDAGOJİK VE OYUNLAŞTIRILMIŞ MODÜLLER (ADIM 1 - ADIM 5)
       1. Sokratik Maskot ve "Akıllı Rehber" Sistemi (🦉 Bilge Baykuş)
       2. Günlük Görevler ve Haftalık Macera Haritası + Ekran Süresi Dengesi
       3. "Kendi Bulmacanı Tasarla" (Sandbox / Üretim Modu)
       4. Ebeveyn / Öğretmen Gözlem ve Raporlama Paneli
       5. Süre Baskısı ve Kaygı Yönetimi Optimizasyonu
       ========================================================================= */

    // --- ADIM 1: SOKRATİK MASKOT VE AKILLI REHBER SİSTEMİ (2 DK SONRA AKTİF VE KISA) ---
    const mascotBar = document.getElementById('mascotBar');
    const mascotAvatar = document.getElementById('mascotAvatar');
    const mascotBubble = document.getElementById('mascotBubble');
    const btnMascotAsk = document.getElementById('btnMascotAsk');
    const btnMascotClose = document.getElementById('btnMascotClose');
    let mascotTwoMinTimer = null;
    let mascotMistakeCount = 0;

    function isCornerCell(r, c) {
      return (r === 0 || r === size - 1) && (c === 0 || c === size - 1);
    }
    function isEdgeCell(r, c) {
      return r === 0 || r === size - 1 || c === 0 || c === size - 1;
    }

    // Dünyada tek: Çıkmaz Sokak / Tekil Boş Nokta Dedektörü
    function findIsolatedEmptyCell() {
      const occupied = new Set();
      for (const l of letters) {
        for (const [r, c] of (paths[l] || [])) occupied.add(key(r, c));
      }
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (isObstacle(r, c) || getEndpointLetter(r, c) || occupied.has(key(r, c))) continue;
          const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
          let freeSides = 0;
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nr >= size || nc < 0 || nc >= size || isObstacle(nr, nc)) continue;
            const owner = getCellOwner(nr, nc);
            if (!owner || !isPathComplete(owner)) freeSides++;
          }
          if (freeSides <= 1) return [r, c];
        }
      }
      return null;
    }

    function generateSocraticQuestion() {
      const unconnected = letters.filter(l => !isPathComplete(l));
      const filled = countFilledCells();
      const total = totalUsableCells();
      const emptyCount = total - filled;

      // Durum 0: Çıkmaz sokak veya etrafı kapanmış tekil boş nokta tespiti
      const isolated = findIsolatedEmptyCell();
      if (isolated && emptyCount > 0) {
        return `<strong>Rehber:</strong> Dikkat! <strong>(${isolated[0] + 1}. satır, ${isolated[1] + 1}. sütun)</strong> noktasının etrafı kapanmış; yanındaki çizgiyi oradan geçir!`;
      }

      // Durum 1: Tüm harfler bağlanmış ama boş noktalar kalmış
      if (unconnected.length === 0 && emptyCount > 0) {
        return `<strong>Rehber:</strong> Harfler birleşti! Açıkta kalan <strong>${emptyCount} boş noktayı</strong> yandaki çizgiyi esneterek doldur.`;
      }

      // Durum 2: Köşedeki harf
      for (const l of unconnected) {
        const sym = getSymbol(l, true);
        const [ep1, ep2] = endpoints[l];
        if (isCornerCell(ep1[0], ep1[1]) || isCornerCell(ep2[0], ep2[1])) {
          return `<strong>Rehber:</strong> <strong>'${sym}'</strong> köşede duruyor; diğerlerinin yolunu kesmemek için kenar çizgisinden dolaştır!`;
        }
      }

      // Durum 3: Kenardaki harf
      for (const l of unconnected) {
        const sym = getSymbol(l, true);
        const [ep1, ep2] = endpoints[l];
        if (isEdgeCell(ep1[0], ep1[1]) && isEdgeCell(ep2[0], ep2[1])) {
          return `<strong>Rehber:</strong> <strong>'${sym}'</strong> harfini dış duvar boyunca bağlarsan ortadaki harflere geniş yer kalır!`;
        }
      }

      // Durum 4: Genel kısa yönlendirme
      if (unconnected.length > 0) {
        const targetL = unconnected[0];
        const sym = getSymbol(targetL, true);
        const prompts = [
          `<strong>Rehber:</strong> <strong>'${sym}'</strong> harfini bağlarken köşedeki boş noktalardan L dönüşü yaparak ilerle!`,
          `<strong>Rehber:</strong> Önce tahtanın en köşesindeki boş noktaları doldurarak <strong>'${sym}'</strong> harfini eşleştir!`,
          `<strong>Rehber:</strong> <strong>'${sym}'</strong> etrafındaki boşluklara dikkat et; kenardan dolaşırsan diğer harfler sıkışmaz.`
        ];
        return prompts[(Date.now() / 1000 | 0) % prompts.length];
      }

      return `<strong>Rehber:</strong> Harika gidiyorsun! Bütün noktalar doldu! 🎉`;
    }

    function showMascotMessage(htmlMsg, makeVisible = true) {
      if (!mascotBubble) return;
      mascotBubble.innerHTML = htmlMsg;
      if (mascotBar && makeVisible) {
        mascotBar.classList.add('show');
      }
    }

    function startTwoMinMascotTimer() {
      clearTimeout(mascotTwoMinTimer);
      if (mascotBar) mascotBar.classList.remove('show');
      mascotTwoMinTimer = setTimeout(() => {
        if (puzzleSolved) return;
        showMascotMessage(generateSocraticQuestion(), true);
        playTone(523.25, 0, 0.1, 'sine', 0.05);
      }, 120000); // Bir bulmacada 2 dakika (120.000 ms) geçerse aktif görünür ve yol gösterir
    }

    function onPedagogicalPuzzleStart() {
      mascotMistakeCount = 0;
      startTwoMinMascotTimer();
    }

    function onPedagogicalCheckFail(res) {
      mascotMistakeCount++;
      // Eğer 2 dakika dolup rehber barı açılmışsa mesajı da güncelle
      if (mascotBar && mascotBar.classList.contains('show')) {
        showMascotMessage(generateSocraticQuestion(), true);
      }
    }

    if (btnMascotAsk) {
      btnMascotAsk.addEventListener('click', () => {
        playClick();
        showMascotMessage(generateSocraticQuestion(), true);
      });
    }
    if (btnMascotClose) {
      btnMascotClose.addEventListener('click', () => {
        playClick();
        if (mascotBar) mascotBar.classList.remove('show');
      });
    }
    if (mascotAvatar) {
      mascotAvatar.addEventListener('click', () => {
        playClick();
        showMascotMessage(generateSocraticQuestion(), true);
      });
    }

    // --- ADIM 2: GÜNLÜK GÖREVLER, HAFTALIK MACERA HARİTASI (HAFTA SONU DAHİL) VE EKRAN SÜRESİ DENGESİ ---
    const btnAdventure = document.getElementById('btnAdventure');
    const adventureOverlay = document.getElementById('adventureOverlay');
    const adventureModal = document.getElementById('adventureModal');
    const adventureSummary = document.getElementById('adventureSummary');
    const adventureList = document.getElementById('adventureList');
    const avatarRewardRow = document.getElementById('avatarRewardRow');
    const screenTimeBanner = document.getElementById('screenTimeBanner');
    const adventureClose = document.getElementById('adventureClose');
    const heroKidsEl = document.querySelector('.hero .kids');

    const WEEKLY_ADVENTURE = [
      { day: 1, name: 'Pazartesi · Orman Patikası', desc: '2 Bulmaca Çöz ve Köşeleri Keşfet', target: 2, rewardHat: '🎓', rewardTitle: 'Bilge Kepi' },
      { day: 2, name: 'Salı · Kristal Mağara', desc: 'İpucu Kullanmadan 2 Bulmaca Tamamla', target: 2, rewardHat: '🦊', rewardTitle: 'Kurnaz Tilki' },
      { day: 3, name: 'Çarşamba · Gökyüzü Köprüsü', desc: 'Toplam 3 Bulmaca Çözerek Köprüyü Kur', target: 3, rewardHat: '🚀', rewardTitle: 'Uzay Kaskı' },
      { day: 4, name: 'Perşembe · Gökkuşağı Vadisi', desc: 'Farklı Seviyelerde 2 Bulmaca Tamamla', target: 2, rewardHat: '🌈', rewardTitle: 'Gökkuşağı Rozeti' },
      { day: 5, name: 'Cuma · Zekâ Kalesi Finali', desc: 'Haftanın Şampiyonluk Bulmacalarını (3 Adet) Çöz!', target: 3, rewardHat: '👑', rewardTitle: 'Altın Bilge Tacı' },
      { day: 6, name: 'Hafta Sonu · Şampiyonlar Adası (Bonus)', desc: 'Cumartesi/Pazar antrenmanında 3 Bulmaca Çöz!', target: 3, rewardHat: '🦄', rewardTitle: 'Efsane Tekboynuz' }
    ];

    function currentIsoWeekKey() {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const weekNo = Math.ceil((((now - start) / 86400000) + start.getDay() + 1) / 7);
      return `${now.getFullYear()}-W${weekNo}`;
    }

    function ensureAdventureWeekSync() {
      if (!appData.adventureDays) appData.adventureDays = {};
      if (!appData.unlockedHats) appData.unlockedHats = {};
      // Önceden kazanılmış şapkaları kalıcı gardıroba işle
      WEEKLY_ADVENTURE.forEach(q => {
        if ((appData.adventureDays['d' + q.day] || 0) >= q.target) {
          appData.unlockedHats[q.rewardHat] = true;
        }
      });
      const wk = currentIsoWeekKey();
      if (appData.adventureWeek && appData.adventureWeek !== wk) {
        // Yeni hafta başladı: Kazanılan şapkalar korunur, haftalık görev sayaçları tazelenir!
        appData.adventureDays = {};
      }
      appData.adventureWeek = wk;
    }
    ensureAdventureWeekSync();

    let sessionActiveSeconds = 0;
    let screenTimeReminderShown = false;

    // Her 30 saniyede aktif oyun süresini kaydet ve 18 dakikada nazik mola hatırlatması sun
    setInterval(() => {
      if (document.hidden) return;
      sessionActiveSeconds += 30;
      appData.activeMinutes = Math.round(((appData.activeMinutes || 0) * 60 + 30) / 60);
      saveAppData();
      if (sessionActiveSeconds >= 18 * 60 && !screenTimeReminderShown) {
        screenTimeReminderShown = true;
        showMascotMessage(
          `<strong>Rehber (Sağlıklı Mola):</strong> 18 dakikadır harika çözdün! 🌱 Gözlerini 20 sn uzağa bakarak dinlendir.`,
          true
        );
      }
    }, 30000);

    function applyEquippedHat() {
      if (!heroKidsEl) return;
      const hat = appData.equippedHat || '';
      heroKidsEl.textContent = hat ? `${hat}👧🧒` : '👧🧒';
    }
    applyEquippedHat();

    function toggleEquipHat(hat) {
      playClick();
      appData.equippedHat = (appData.equippedHat === hat) ? '' : hat;
      saveAppData();
      applyEquippedHat();
      renderAdventureModal();
    }

    function isHatUnlocked(q) {
      ensureAdventureWeekSync();
      return !!appData.unlockedHats[q.rewardHat] || ((appData.adventureDays['d' + q.day] || 0) >= q.target);
    }

    function renderAdventureModal() {
      ensureAdventureWeekSync();
      const todayDow = new Date().getDay(); // 0:Pazar, 1:Pzt ... 5:Cuma, 6:Cmt
      const activeDayIdx = (todayDow >= 1 && todayDow <= 5) ? todayDow : 6;
      const completedStops = WEEKLY_ADVENTURE.filter(q => (appData.adventureDays['d' + q.day] || 0) >= q.target).length;
      const curAvatarText = appData.equippedHat ? `${appData.equippedHat}👧🧒` : '👧🧒';

      if (adventureSummary) {
        adventureSummary.textContent = `Bu Hafta Tamamlanan Durak: ${completedStops} / ${WEEKLY_ADVENTURE.length} · Aktif Avatar: ${curAvatarText}`;
      }

      if (adventureList) {
        adventureList.innerHTML = WEEKLY_ADVENTURE.map(q => {
          const prog = appData.adventureDays['d' + q.day] || 0;
          const done = prog >= q.target;
          const hatUnlocked = isHatUnlocked(q);
          const isToday = q.day === activeDayIdx;
          const equipped = appData.equippedHat === q.rewardHat;
          return `<div class="adv-node ${done ? 'done' : ''}">
            <div class="adv-left">
              <div class="adv-ic">${done ? '✅' : q.rewardHat}</div>
              <div>
                <div class="adv-title">${q.name} ${isToday ? '<span style="color:#6a1b9a;">(Bugün)</span>' : ''}</div>
                <div class="adv-sub">${q.desc} · İlerleme: <strong>${Math.min(q.target, prog)}/${q.target}</strong></div>
              </div>
            </div>
            <button type="button" class="adv-reward-btn ${equipped ? 'equipped' : ''}" data-hat="${q.rewardHat}" data-unlocked="${hatUnlocked}">
              ${hatUnlocked ? (equipped ? `${q.rewardHat} Takılı` : `${q.rewardHat} Tak`) : `🔒 ${q.rewardHat}`}
            </button>
          </div>`;
        }).join('');

        adventureList.querySelectorAll('.adv-reward-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.getAttribute('data-unlocked') !== 'true') {
              showToast('gentle', '🗺️', 'Henüz Kilitli', 'Bu şapka ödülünü açmak için ilgili günün macera görevini tamamla!');
              return;
            }
            toggleEquipHat(btn.getAttribute('data-hat'));
          });
        });
      }

      if (avatarRewardRow) {
        avatarRewardRow.innerHTML = WEEKLY_ADVENTURE.map(q => {
          const unlocked = isHatUnlocked(q);
          const active = appData.equippedHat === q.rewardHat;
          return `<button type="button" class="pal-btn ${active ? 'active' : ''}" style="${unlocked ? '' : 'opacity:0.55;'}" data-hat="${q.rewardHat}" data-unlocked="${unlocked}">
            ${q.rewardHat} ${q.rewardTitle} ${unlocked ? (active ? '✓' : '') : '🔒'}
          </button>`;
        }).join('');

        avatarRewardRow.querySelectorAll('.pal-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.getAttribute('data-unlocked') !== 'true') {
              showToast('gentle', '🗺️', 'Henüz Kilitli', 'Bu şapka/rozet ödülünü açmak için ilgili günün macera görevini tamamla!');
              return;
            }
            toggleEquipHat(btn.getAttribute('data-hat'));
          });
        });
      }

      const sessionMin = Math.max(1, Math.round(sessionActiveSeconds / 60));
      if (screenTimeBanner) {
        screenTimeBanner.textContent = `🌱 Sağlıklı Ekran Süresi: Bugün aktif ${sessionMin} dk oynadın (Önerilen günlük ideal süre: 15–20 dk).`;
      }
    }

    function openAdventureModal() {
      renderAdventureModal();
      adventureOverlay.classList.add('show');
      adventureModal.classList.add('show');
    }
    function closeAdventureModal() {
      adventureOverlay.classList.remove('show');
      adventureModal.classList.remove('show');
    }
    if (btnAdventure) btnAdventure.addEventListener('click', () => { playClick(); openAdventureModal(); });
    if (adventureClose) adventureClose.addEventListener('click', () => { playClick(); closeAdventureModal(); });
    if (adventureOverlay) adventureOverlay.addEventListener('click', closeAdventureModal);

    // --- 🧩 ÇOCUK YAPBOZ AKADEMİSİ (16 SEVİYE + ZOR & UZMAN SONSUZ YAPBOZ MODU · 4 PEDAGOJİK FORMAT + CANLI BULMACA) ---
    const btnJigsaw = document.getElementById('btnJigsaw');
    const jigsawOverlay = document.getElementById('jigsawOverlay');
    const jigsawModal = document.getElementById('jigsawModal');
    const jigsawStage = document.getElementById('jigsawStage');
    const jigsawRefPanel = document.getElementById('jigsawRefPanel');
    const jigsawRefCanvas = document.getElementById('jigsawRefCanvas');
    const jigsawRefSub = document.getElementById('jigsawRefSub');
    const jigsawTierBar = document.getElementById('jigsawTierBar');
    const jigsawLevelBar = document.getElementById('jigsawLevelBar');
    const jigsawStyleBar = document.getElementById('jigsawStyleBar');
    const jigsawGroupBar = document.getElementById('jigsawGroupBar');
    const btnJigsawTierGroup = document.getElementById('btnJigsawTierGroup');
    const btnJigsawLevelGroup = document.getElementById('btnJigsawLevelGroup');
    const btnJigsawStyleGroup = document.getElementById('btnJigsawStyleGroup');
    const jigsawTierBtnLabel = document.getElementById('jigsawTierBtnLabel');
    const jigsawLevelBtnLabel = document.getElementById('jigsawLevelBtnLabel');
    const jigsawStyleBtnLabel = document.getElementById('jigsawStyleBtnLabel');
    const jigsawGhostBtnLabel = document.getElementById('jigsawGhostBtnLabel');
    const jigsawDropdownBackdrop = document.getElementById('jigsawDropdownBackdrop');
    const jigsawTierPanel = document.getElementById('jigsawTierPanel');
    const jigsawLevelPanel = document.getElementById('jigsawLevelPanel');
    const jigsawStylePanel = document.getElementById('jigsawStylePanel');
    const btnJigsawGhost = document.getElementById('btnJigsawGhost');
    const jigsawBoardWrap = document.getElementById('jigsawBoardWrap');
    const jigsawGhostCanvas = document.getElementById('jigsawGhostCanvas');
    const jigsawBoardGrid = document.getElementById('jigsawBoardGrid');
    const jigsawTray = document.getElementById('jigsawTray');
    const jigsawStatus = document.getElementById('jigsawStatus');
    const jigsawScoreBadge = document.getElementById('jigsawScoreBadge');
    const jigsawClose = document.getElementById('jigsawClose');
    const jigsawShuffleBtn = document.getElementById('jigsawShuffleBtn');
    const jigsawNextThemeBtn = document.getElementById('jigsawNextThemeBtn');

    // 5 Zorluk Kademesi (Başlangıç, Kolay ve Orta'da ipucu baştaki gibi açık; Zor ve Uzman'da ipucusuz + yanda yapılmış görsel + sonsuz yapboz!)
    const JIGSAW_TIERS = [
      { id: 0, label: '🌱 Başlangıç', sub: '2×2 / 4 Şerit',  rows: 2, cols: 2, stripCols: 4,  bonus: 20, cutType: 'interlock', endless: false },
      { id: 1, label: '🌿 Kolay',     sub: '2×3 / 5 Şerit',  rows: 2, cols: 3, stripCols: 5,  bonus: 30, cutType: 'interlock', endless: false },
      { id: 2, label: '⭐ Orta',      sub: '3×3 / 6 Şerit',  rows: 3, cols: 3, stripCols: 6,  bonus: 45, cutType: 'interlock', endless: false },
      { id: 3, label: '🔥 Zor',       sub: '3×4 / 8 Şerit',  rows: 3, cols: 4, stripCols: 8,  bonus: 65, cutType: 'interlock', endless: true  },
      { id: 4, label: '👑 Uzman',     sub: '4×4 / 10 Şerit', rows: 4, cols: 4, stripCols: 10, bonus: 90, cutType: 'interlock', endless: true  }
    ];

    const JIGSAW_SCENE_NAMES = [
      '🐶 Sevimli Yavru Köpek',
      '🚗 Klasik Kırmızı Otomobil',
      '🤿 Sarı Denizaltı Keşfi',
      '🌈 Gökkuşağı Kilitli Bloklar',
      '🚀 Uzay Roketi & Gezegenler',
      '🦁 Neşeli Orman Safarisi',
      '🚂 Renkli Buharlı Tren',
      '🏰 Masal Şatosu & Balonlar',
      '⛵ Korsan Gemisi & Hazine Adası',
      '🦉 Bilge Baykuş Gece Ormanı'
    ];

    // 16 Temel Seviye (Başlangıç, Kolay ve Orta ipuçlu; Zor ve Uzman yandaki yapılmış görsele bakarak sonsuz yapbozlu)
    const JIGSAW_LEVELS = [
      // Kademe 0 (Başlangıç - İpuçlu)
      { lvl: 1,  tier: 0, style: 1, scene: 0, title: 'Seviye 1 · Sevimli Kaplumbağa (Parça Birleştir · Kafa, Gövde, Ayaklar)' },
      { lvl: 2,  tier: 0, style: 2, scene: 0, title: 'Seviye 2 · Ritmik Sayı Şeridi 1–4 (Sayı Sıralamalı Dikey Şerit)' },
      { lvl: 3,  tier: 0, style: 0, scene: 0, title: 'Seviye 3 · Sevimli Yavru Köpek (Figürlü Kilitli Ahşap Yapboz)' },
      // Kademe 1 (Kolay - İpuçlu)
      { lvl: 4,  tier: 1, style: 0, scene: 1, title: 'Seviye 4 · Kırmızı Klasik Araba (Figürlü Kilitli Şablon)' },
      { lvl: 5,  tier: 1, style: 2, scene: 1, title: 'Seviye 5 · Ritmik Sayı Şeridi 1–5 (Sayı Sıralamalı Dikey Şerit)' },
      { lvl: 6,  tier: 1, style: 3, scene: 1, title: 'Seviye 6 · Kare Kesimli Makas Etkinliği (Düz Kesikli 2×3)' },
      // Kademe 2 (Orta - Baştaki Gibi İpuçlu)
      { lvl: 7,  tier: 2, style: 0, scene: 2, title: 'Seviye 7 · Sarı Denizaltı Keşfi (Figürlü Kilitli Ahşap Yapboz)' },
      { lvl: 8,  tier: 2, style: 1, scene: 2, title: 'Seviye 8 · Bilge Robot Parçaları (Organik Parça Birleştirme)' },
      { lvl: 9,  tier: 2, style: 2, scene: 2, title: 'Seviye 9 · Ritmik Sayı Şeridi 1–6 (Sayı Sıralamalı Dikey Şerit)' },
      // Kademe 3 (Zor - İpucusuz · Yandaki Görsele Bakarak · Sonsuz Yapboz)
      { lvl: 10, tier: 3, style: 0, scene: 3, title: 'Zor · Gökkuşağı Kilitli Bloklar (Yandaki Görsele Bakarak)' },
      { lvl: 11, tier: 3, style: 1, scene: 5, title: 'Zor · Neşeli Orman Safarisi (Parça Birleştirme · Bakarak Yap)' },
      { lvl: 12, tier: 3, style: 2, scene: 6, title: 'Zor · Buharlı Tren 8 Şerit (İpucusuz · Bakarak Yap)' },
      // Kademe 4 (Uzman - İpucusuz · Yandaki Görsele Bakarak · Sonsuz Yapboz)
      { lvl: 13, tier: 4, style: 3, scene: 7, title: 'Uzman · Masal Şatosu 4×4 Kare Kesim (Bakarak Yap)' },
      { lvl: 14, tier: 4, style: 2, scene: 8, title: 'Uzman · Hazine Adası 10 Şerit (İpucusuz · Bakarak Yap)' },
      { lvl: 15, tier: 4, style: 0, scene: 9, title: 'Uzman · Bilge Baykuş 4×4 Kilitli Şablon (Bakarak Yap)' },
      { lvl: 16, tier: 4, style: 4, scene: 4, title: 'Uzman · Canlı ABC Bulmacası (4×4 Kilitli Bonus Yapboz)' }
    ];

    let jigsawCurLevelIdx = 0;
    let jigsawCustomStyle = null;
    let jigsawShowGhost = true;
    let jigsawBoardState = [];
    let jigsawTrayState = [];
    let jigsawSelectedPiece = null;
    let jigsawSolvedLock = false;
    // Zor (3) ve Uzman (4) kademelerinde sonsuz yapboz sayacı ve tohum (seed) değeri
    let jigsawEndlessStep = { 3: 0, 4: 0 };
    let jigsawActiveSeed = 0;
    const JIGSAW_LOGICAL_SIZE = 252;
    const JIGSAW_CANVAS_SIZE = 504;
    let jigsawMasterCanvas = document.createElement('canvas');
    jigsawMasterCanvas.width = JIGSAW_CANVAS_SIZE;
    jigsawMasterCanvas.height = JIGSAW_CANVAS_SIZE;

    function getActiveJigsawConfig() {
      const baseLvl = JIGSAW_LEVELS[jigsawCurLevelIdx] || JIGSAW_LEVELS[0];
      const baseTier = JIGSAW_TIERS[baseLvl.tier] || JIGSAW_TIERS[0];
      const eStep = baseTier.endless ? (jigsawEndlessStep[baseTier.id] || 0) : 0;
      const styleIdx = (jigsawCustomStyle !== null)
        ? jigsawCustomStyle
        : (eStep > 0 ? ((baseLvl.style + eStep) % 5) : baseLvl.style);
      const sceneSeed = (eStep > 0) ? (baseLvl.scene + eStep * 3 + baseTier.id) : baseLvl.scene;
      jigsawActiveSeed = sceneSeed;

      let rows = baseTier.rows;
      let cols = baseTier.cols;
      let cutType = 'interlock';
      if (styleIdx === 2) {
        rows = 1;
        cols = baseTier.stripCols || 5;
        cutType = 'strip';
      } else if (styleIdx === 3) {
        cutType = 'scissors';
      } else if (styleIdx === 1) {
        cutType = 'organic';
      } else {
        cutType = 'interlock';
      }

      const sceneLabel = JIGSAW_SCENE_NAMES[sceneSeed % JIGSAW_SCENE_NAMES.length];
      const endlessNum = eStep + 1;
      const dynamicTitle = baseTier.endless
        ? `${baseTier.label} · ♾️ Sonsuz Yapboz #${endlessNum} (${sceneLabel})`
        : baseLvl.title;

      const lvlObj = Object.assign({}, baseLvl, { scene: sceneSeed, title: dynamicTitle, endlessNum });
      const tierObj = Object.assign({}, baseTier, { rows, cols, cutType });
      return { lvlObj, tierObj, styleIdx };
    }

    // Komşu yapboz parçaları arasında birbirine tam kilitlenen (+1 çıkıntı / -1 girinti) deterministik kenar yönü
    function getInterlockEdges(r, c, rows, cols) {
      const sd = jigsawActiveSeed || 0;
      const hSign = (rr, cc) => (((rr * 7 + cc * 13 + sd * 5 + 3) % 2 === 0) ? 1 : -1);
      const vSign = (rr, cc) => (((rr * 11 + cc * 5 + sd * 7 + 1) % 2 === 0) ? -1 : 1);
      return {
        top:    (r === 0)        ? 0 : -hSign(r - 1, c),
        bottom: (r === rows - 1) ? 0 :  hSign(r, c),
        left:   (c === 0)        ? 0 : -vSign(r, c - 1),
        right:  (c === cols - 1) ? 0 :  vSign(r, c)
      };
    }

    // Gerçek Bezier girintili-çıkıntılı kilitli yapboz parçası konturu çizici
    function traceInterlockingPiecePath(ctx, x0, y0, w, h, edges) {
      const tabH = Math.min(w, h) * 0.175;
      const neck = 0.10;
      const head = 0.17;
      ctx.beginPath();
      ctx.moveTo(x0, y0);

      // Üst kenar (soldan sağa)
      if (!edges.top) {
        ctx.lineTo(x0 + w, y0);
      } else {
        const s = edges.top; // +1 dışarı (yukarı), -1 içeri (aşağı)
        const ny = -s * tabH;
        ctx.lineTo(x0 + w * (0.5 - neck), y0);
        ctx.bezierCurveTo(
          x0 + w * (0.5 - neck * 0.6), y0 + ny * 0.35,
          x0 + w * (0.5 - head),       y0 + ny * 0.95,
          x0 + w * 0.5,                y0 + ny
        );
        ctx.bezierCurveTo(
          x0 + w * (0.5 + head),       y0 + ny * 0.95,
          x0 + w * (0.5 + neck * 0.6), y0 + ny * 0.35,
          x0 + w * (0.5 + neck),       y0
        );
        ctx.lineTo(x0 + w, y0);
      }

      // Sağ kenar (yukarıdan aşağıya)
      if (!edges.right) {
        ctx.lineTo(x0 + w, y0 + h);
      } else {
        const s = edges.right; // +1 dışarı (sağa), -1 içeri (sola)
        const nx = s * tabH;
        ctx.lineTo(x0 + w, y0 + h * (0.5 - neck));
        ctx.bezierCurveTo(
          x0 + w + nx * 0.35, y0 + h * (0.5 - neck * 0.6),
          x0 + w + nx * 0.95, y0 + h * (0.5 - head),
          x0 + w + nx,        y0 + h * 0.5
        );
        ctx.bezierCurveTo(
          x0 + w + nx * 0.95, y0 + h * (0.5 + head),
          x0 + w + nx * 0.35, y0 + h * (0.5 + neck * 0.6),
          x0 + w,             y0 + h * (0.5 + neck)
        );
        ctx.lineTo(x0 + w, y0 + h);
      }

      // Alt kenar (sağdan sola)
      if (!edges.bottom) {
        ctx.lineTo(x0, y0 + h);
      } else {
        const s = edges.bottom; // +1 dışarı (aşağı), -1 içeri (yukarı)
        const ny = s * tabH;
        ctx.lineTo(x0 + w * (0.5 + neck), y0 + h);
        ctx.bezierCurveTo(
          x0 + w * (0.5 + neck * 0.6), y0 + h + ny * 0.35,
          x0 + w * (0.5 + head),       y0 + h + ny * 0.95,
          x0 + w * 0.5,                y0 + h + ny
        );
        ctx.bezierCurveTo(
          x0 + w * (0.5 - head),       y0 + h + ny * 0.95,
          x0 + w * (0.5 - neck * 0.6), y0 + h + ny * 0.35,
          x0 + w * (0.5 - neck),       y0 + h
        );
        ctx.lineTo(x0, y0 + h);
      }

      // Sol kenar (aşağıdan yukarıya)
      if (!edges.left) {
        ctx.lineTo(x0, y0);
      } else {
        const s = edges.left; // +1 dışarı (sola), -1 içeri (sağa)
        const nx = -s * tabH;
        ctx.lineTo(x0, y0 + h * (0.5 + neck));
        ctx.bezierCurveTo(
          x0 + nx * 0.35, y0 + h * (0.5 + neck * 0.6),
          x0 + nx * 0.95, y0 + h * (0.5 + head),
          x0 + nx,        y0 + h * 0.5
        );
        ctx.bezierCurveTo(
          x0 + nx * 0.95, y0 + h * (0.5 - head),
          x0 + nx * 0.35, y0 + h * (0.5 - neck * 0.6),
          x0,             y0 + h * (0.5 - neck)
        );
        ctx.lineTo(x0, y0);
      }
      ctx.closePath();
    }

    // FORMAT 0 (🚗 Figürlü Klasik Kilitli Şablon): 10 Zengin Vektörel Sahne + Sonsuz Varyasyon
    function drawStyle0Scene(ctx, W, H, sceneIdx, rows = 3, cols = 3) {
      const mode = sceneIdx % 10;
      const variant = Math.floor(sceneIdx / 10);
      if (mode === 0) {
        // Sahne 0: 🐶 Sevimli Yavru Köpek
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, variant % 2 === 1 ? '#1d3557' : '#1b4332');
        bg.addColorStop(0.45, variant % 2 === 1 ? '#457b9d' : '#52b788');
        bg.addColorStop(1, '#74c69d');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        [['rgba(255,255,255,0.22)', 48, 42, 22], ['rgba(255,245,157,0.28)', 202, 54, 28], ['rgba(255,255,255,0.18)', 38, 170, 26]].forEach(([c, x, y, r]) => {
          ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        });

        ctx.fillStyle = '#f5ebe0';
        ctx.beginPath(); ctx.ellipse(126, 212, 66, 56, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#d4a373';
        ctx.beginPath(); ctx.ellipse(84, 225, 22, 34, 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(168, 225, 22, 34, -0.2, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#b07d4f';
        ctx.beginPath(); ctx.ellipse(62, 114, 26, 48, 0.32, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(190, 114, 26, 48, -0.32, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#d4a373';
        ctx.beginPath(); ctx.arc(126, 108, 60, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#faedcd';
        ctx.beginPath(); ctx.ellipse(98, 96, 26, 32, -0.15, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(154, 96, 26, 32, 0.15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.ellipse(126, 126, 36, 28, 0, 0, Math.PI * 2); ctx.fill();

        [[98, 96], [154, 96]].forEach(([ex, ey]) => {
          ctx.fillStyle = '#1f1300';
          ctx.beginPath(); ctx.arc(ex, ey, 10.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(ex - 3, ey - 3.5, 3.5, 0, Math.PI * 2); ctx.fill();
        });

        ctx.fillStyle = '#f28482';
        ctx.beginPath(); ctx.ellipse(126, 148, 12, 16, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#e56b6f'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(126, 136); ctx.lineTo(126, 158); ctx.stroke();

        ctx.fillStyle = '#2b2d42';
        ctx.beginPath(); ctx.ellipse(126, 120, 14, 10, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath(); ctx.ellipse(122, 117, 4, 2.5, 0, 0, Math.PI * 2); ctx.fill();
        if (variant > 0) {
          ctx.font = '28px "Segoe UI Emoji", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('🦋', 42, 48); ctx.fillText('🌼', 214, 218); ctx.fillText('🦴', 44, 222);
        }
      } else if (mode === 1) {
        // Sahne 1: 🚗 Figürlü Klasik Araba Şablonu
        const carColors = ['#e63946', '#1e88e5', '#fb8c00', '#8e24aa', '#2e7d32'];
        const bodyCol = carColors[variant % carColors.length];
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#90e0ef');
        sky.addColorStop(0.65, '#caf0f8');
        sky.addColorStop(0.65, '#81c784');
        sky.addColorStop(1, '#4caf50');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#ffb703';
        ctx.beginPath(); ctx.arc(46, 44, 22, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        [[175, 42, 16], [192, 38, 20], [210, 44, 15]].forEach(([x, y, r]) => {
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        });

        ctx.fillStyle = '#455a64';
        ctx.fillRect(0, 182, W, 46);
        ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 4; ctx.setLineDash([14, 10]);
        ctx.beginPath(); ctx.moveTo(0, 205); ctx.lineTo(W, 205); ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = bodyCol;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(26, 172);
        ctx.lineTo(26, 138);
        ctx.quadraticCurveTo(30, 118, 62, 114);
        ctx.quadraticCurveTo(84, 72, 132, 72);
        ctx.quadraticCurveTo(178, 72, 194, 114);
        ctx.quadraticCurveTo(226, 118, 228, 144);
        ctx.lineTo(228, 172);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#a8dadc';
        ctx.beginPath();
        ctx.moveTo(74, 114);
        ctx.quadraticCurveTo(90, 82, 124, 82);
        ctx.lineTo(124, 114);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(132, 82);
        ctx.quadraticCurveTo(168, 82, 182, 114);
        ctx.lineTo(132, 114);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffd166';
        ctx.beginPath(); ctx.arc(222, 136, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffb703';
        ctx.fillRect(118, 128, 18, 6);

        [[74, 174], [182, 174]].forEach(([wx, wy]) => {
          ctx.fillStyle = '#1d3557';
          ctx.beginPath(); ctx.arc(wx, wy, 26, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#f1faee';
          ctx.beginPath(); ctx.arc(wx, wy, 14, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = bodyCol;
          ctx.beginPath(); ctx.arc(wx, wy, 6, 0, Math.PI * 2); ctx.fill();
        });
      } else if (mode === 2) {
        // Sahne 2: 🤿 Sarı Denizaltı Keşfi
        const sea = ctx.createLinearGradient(0, 0, 0, H);
        sea.addColorStop(0, '#0077b6');
        sea.addColorStop(0.6, '#0096c7');
        sea.addColorStop(1, '#03045e');
        ctx.fillStyle = sea;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#ffca3a';
        ctx.beginPath(); ctx.ellipse(126, 244, 140, 28, 0, 0, Math.PI * 2); ctx.fill();
        ctx.font = '34px "Segoe UI Emoji", sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🪸', 42, 214); ctx.fillText('🐠', 212, 68); ctx.fillText('🐙', 208, 206); ctx.fillText('🐢', 48, 62);

        ctx.strokeStyle = '#ff9f1c'; ctx.lineWidth = 10; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(118, 82); ctx.lineTo(118, 46); ctx.lineTo(138, 46); ctx.stroke();
        ctx.fillStyle = '#ff9f1c';
        ctx.beginPath(); ctx.moveTo(192, 134); ctx.lineTo(228, 108); ctx.lineTo(228, 160); ctx.closePath(); ctx.fill();

        ctx.fillStyle = '#ffbe0b';
        ctx.strokeStyle = '#fb5607';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.ellipse(122, 136, 76, 48, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#caf0f8';
        ctx.beginPath(); ctx.arc(96, 134, 28, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ff9f1c'; ctx.lineWidth = 5; ctx.stroke();
        ctx.font = '36px "Segoe UI Emoji", sans-serif';
        ctx.fillText('🧒', 96, 136);
        ctx.fillStyle = '#caf0f8';
        ctx.beginPath(); ctx.arc(154, 134, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      } else if (mode === 3) {
        // Sahne 3: 🌈 Gökkuşağı Kilitli Yapboz Blokları
        const colsP = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa', '#00acc1', '#ec407a'];
        const icons = ['⭐', '💎', '☀️', '🍀', '🎵', '🚀', '🦋', '🎈', '👑', '⚽', '🐬', '🌺', '🦄', '🍎', '🎨', '🧩'];
        const tw = W / cols, th = H / rows;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            ctx.fillStyle = colsP[(r * 3 + c * 2 + variant) % colsP.length];
            ctx.fillRect(c * tw, r * th, tw + 1, th + 1);
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.beginPath(); ctx.arc(c * tw + tw * 0.5, r * th + th * 0.5, Math.min(tw, th) * 0.34, 0, Math.PI * 2); ctx.fill();
            ctx.font = `${Math.max(16, Math.floor(Math.min(tw, th) * 0.44))}px "Segoe UI Emoji", sans-serif`;
            ctx.fillText(icons[(idx + variant * 3) % icons.length], c * tw + tw * 0.5, r * th + th * 0.5);
          }
        }
      } else if (mode === 4) {
        // Sahne 4: 🚀 Uzay Roketi & Gezegenler
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#0d1b3e'); grad.addColorStop(0.55, '#1a237e'); grad.addColorStop(1, '#311b92');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.arc(54, 56, 26, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ff8a65'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.ellipse(195, 64, 34, 12, -0.35, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#ff7043'; ctx.beginPath(); ctx.arc(195, 64, 17, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#26a69a'; ctx.beginPath(); ctx.arc(126, 275, 95, 0, Math.PI * 2); ctx.fill();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        [['🚀', 126, 126, 76], ['👨‍🚀', 64, 178, 48], ['🛸', 192, 168, 48], ['🌟', 126, 44, 38]].forEach(([e, x, y, s]) => {
          ctx.font = `${s}px "Segoe UI Emoji", sans-serif`; ctx.fillText(e, x, y);
        });
      } else if (mode === 5) {
        // Sahne 5: 🦁 Neşeli Orman Safarisi (Aslan, Zürafa, Fil, Savan Güneşi)
        const sav = ctx.createLinearGradient(0, 0, 0, H);
        sav.addColorStop(0, '#ff9f1c'); sav.addColorStop(0.55, '#ffbf69'); sav.addColorStop(0.55, '#a7c957'); sav.addColorStop(1, '#6a994e');
        ctx.fillStyle = sav; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff3b0'; ctx.beginPath(); ctx.arc(196, 52, 28, 0, Math.PI * 2); ctx.fill();
        // Akasya Ağacı
        ctx.fillStyle = '#582f0e'; ctx.fillRect(52, 82, 12, 68);
        ctx.fillStyle = '#386641'; ctx.beginPath(); ctx.ellipse(58, 76, 48, 20, 0, 0, Math.PI * 2); ctx.fill();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        [['🦁', 126, 174, 72], ['🦒', 198, 146, 62], ['🐘', 54, 192, 56], ['🦜', 92, 56, 36]].forEach(([e, x, y, s]) => {
          ctx.font = `${s}px "Segoe UI Emoji", sans-serif`; ctx.fillText(e, x, y);
        });
      } else if (mode === 6) {
        // Sahne 6: 🚂 Renkli Buharlı Tren & Dağ Köprüsü
        const trSky = ctx.createLinearGradient(0, 0, 0, H);
        trSky.addColorStop(0, '#48cae4'); trSky.addColorStop(0.62, '#ade8f4'); trSky.addColorStop(0.62, '#52b788'); trSky.addColorStop(1, '#2d6a4f');
        ctx.fillStyle = trSky; ctx.fillRect(0, 0, W, H);
        // Dağlar
        ctx.fillStyle = '#6c757d';
        ctx.beginPath(); ctx.moveTo(10, 156); ctx.lineTo(84, 62); ctx.lineTo(158, 156); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#adb5bd';
        ctx.beginPath(); ctx.moveTo(110, 156); ctx.lineTo(188, 54); ctx.lineTo(250, 156); ctx.closePath(); ctx.fill();
        // Ray & Köprü
        ctx.fillStyle = '#7f4f24'; ctx.fillRect(0, 176, W, 16);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        [['🚂', 78, 148, 68], ['🚃', 154, 152, 58], ['🛤️', 216, 214, 42], ['☁️', 64, 42, 42], ['☀️', 212, 42, 40]].forEach(([e, x, y, s]) => {
          ctx.font = `${s}px "Segoe UI Emoji", sans-serif`; ctx.fillText(e, x, y);
        });
      } else if (mode === 7) {
        // Sahne 7: 🏰 Masal Şatosu & Uçan Balonlar
        const cSky = ctx.createLinearGradient(0, 0, 0, H);
        cSky.addColorStop(0, '#7209b7'); cSky.addColorStop(0.55, '#b5179e'); cSky.addColorStop(1, '#f72585');
        ctx.fillStyle = cSky; ctx.fillRect(0, 0, W, H);
        // Gökkuşağı Kemeri
        ['#ff595e', '#ffca3a', '#8ac926', '#1982c4'].forEach((col, i) => {
          ctx.strokeStyle = col; ctx.lineWidth = 6;
          ctx.beginPath(); ctx.arc(126, 175, 96 - i * 7, Math.PI, 0); ctx.stroke();
        });
        ctx.fillStyle = '#80ed99'; ctx.beginPath(); ctx.ellipse(126, 236, 140, 48, 0, 0, Math.PI * 2); ctx.fill();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        [['🏰', 126, 152, 82], ['🎈', 46, 74, 46], ['🎠', 202, 186, 48], ['🦄', 54, 190, 48], ['✨', 196, 62, 38]].forEach(([e, x, y, s]) => {
          ctx.font = `${s}px "Segoe UI Emoji", sans-serif`; ctx.fillText(e, x, y);
        });
      } else if (mode === 8) {
        // Sahne 8: ⛵ Korsan Gemisi & Hazine Adası
        const iSky = ctx.createLinearGradient(0, 0, 0, H);
        iSky.addColorStop(0, '#00b4d8'); iSky.addColorStop(0.58, '#90e0ef'); iSky.addColorStop(0.58, '#0077b6'); iSky.addColorStop(1, '#023e8a');
        ctx.fillStyle = iSky; ctx.fillRect(0, 0, W, H);
        // Kumlu Hazine Adası
        ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.ellipse(192, 168, 54, 24, 0, 0, Math.PI * 2); ctx.fill();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        [['⛵', 78, 138, 76], ['🌴', 194, 124, 58], ['🐬', 142, 208, 48], ['☀️', 48, 46, 44], ['🦜', 146, 56, 38]].forEach(([e, x, y, s]) => {
          ctx.font = `${s}px "Segoe UI Emoji", sans-serif`; ctx.fillText(e, x, y);
        });
      } else {
        // Sahne 9: 🦉 Bilge Baykuş & Sihirli Gece Ormanı
        const nSky = ctx.createLinearGradient(0, 0, 0, H);
        nSky.addColorStop(0, '#10002b'); nSky.addColorStop(0.6, '#240046'); nSky.addColorStop(1, '#3c096c');
        ctx.fillStyle = nSky; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fef9ef'; ctx.beginPath(); ctx.arc(194, 58, 30, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#7f5539'; ctx.lineWidth = 12; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(0, 152); ctx.quadraticCurveTo(110, 138, 220, 158); ctx.stroke();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        [['🦉', 118, 112, 74], ['🍄', 62, 212, 48], ['🦊', 184, 208, 52], ['🌟', 54, 52, 38], ['🦋', 192, 124, 38]].forEach(([e, x, y, s]) => {
          ctx.font = `${s}px "Segoe UI Emoji", sans-serif`; ctx.fillText(e, x, y);
        });
      }
    }

    // FORMAT 1 (🐢 Parça Birleştirme / Kes-Yapıştır): Kaplumbağa, Araba, Robot, Dinozor ve Sonsuz Organik Parçalar
    function drawStyle1TangramMandala(ctx, W, H, seedIdx, rows = 2, cols = 2, hideHints = false) {
      const mode = seedIdx % 6;
      ctx.fillStyle = '#fefae0';
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(46, 125, 50, 0.22)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 5]);
      ctx.strokeRect(8, 8, W - 16, H - 16);
      ctx.setLineDash([]);

      if (mode === 0) {
        // 🐢 KAPLUMBAĞA ORGANİK PARÇA BİRLEŞTİRME (Kafa, Sırt Kabuğu, Ön/Arka Ayaklar, Kuyruk)
        ctx.fillStyle = '#e8f5e9';
        ctx.beginPath(); ctx.arc(126, 126, 108, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#7cb342';
        ctx.strokeStyle = '#33691e';
        ctx.lineWidth = 3.5;

        [[64, 74, -0.5], [188, 74, 0.5], [64, 184, 0.5], [188, 184, -0.5]].forEach(([lx, ly, rot]) => {
          ctx.save(); ctx.translate(lx, ly); ctx.rotate(rot);
          ctx.beginPath(); ctx.ellipse(0, 0, 26, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#fff9c4';
          [-8, 0, 8].forEach( dy => { ctx.beginPath(); ctx.arc(lx < 126 ? -24 : 24, dy, 4, 0, Math.PI * 2); ctx.fill(); });
          ctx.restore();
        });

        ctx.fillStyle = '#7cb342';
        ctx.beginPath(); ctx.moveTo(116, 196); ctx.lineTo(126, 232); ctx.lineTo(136, 196); ctx.closePath(); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#8bc34a';
        ctx.beginPath(); ctx.ellipse(126, 44, 28, 25, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        [[115, 38], [137, 38]].forEach(([ex, ey]) => {
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex, ey, 6.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#1b5e20'; ctx.beginPath(); ctx.arc(ex, ey, 3.5, 0, Math.PI * 2); ctx.fill();
        });
        ctx.strokeStyle = '#1b5e20'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(126, 48, 10, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();

        ctx.fillStyle = '#2e7d32';
        ctx.strokeStyle = '#1b5e20'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.ellipse(126, 130, 64, 68, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#66bb6a'; ctx.strokeStyle = '#fff9c4'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(126, 130, 28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        for (let a = 0; a < 6; a++) {
          const ang = (a * Math.PI) / 3;
          const px = 126 + Math.cos(ang) * 44, py = 130 + Math.sin(ang) * 46;
          ctx.fillStyle = (a % 2 === 0) ? '#43a047' : '#81c784';
          ctx.beginPath(); ctx.arc(px, py, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        }
      } else if (mode === 1) {
        drawStyle0Scene(ctx, W, H, 1 + Math.floor(seedIdx / 6) * 10, rows, cols);
      } else if (mode === 2) {
        // 🤖 BİLGE ROBOT PARÇA BİRLEŞTİRME
        ctx.fillStyle = '#e3f2fd'; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#1565c0'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(126, 18); ctx.lineTo(126, 38); ctx.stroke();
        ctx.fillStyle = '#ff5252'; ctx.beginPath(); ctx.arc(126, 16, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#90caf9'; ctx.fillRect(86, 38, 80, 52); ctx.strokeRect(86, 38, 80, 52);
        ctx.fillStyle = '#ffca28'; ctx.beginPath(); ctx.arc(106, 60, 9, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(146, 60, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1565c0'; ctx.fillRect(104, 76, 44, 6);
        ctx.fillStyle = '#ffb74d';
        ctx.fillRect(34, 104, 42, 22); ctx.strokeRect(34, 104, 42, 22);
        ctx.fillRect(176, 104, 42, 22); ctx.strokeRect(176, 104, 42, 22);
        ctx.fillStyle = '#42a5f5'; ctx.fillRect(76, 96, 100, 78); ctx.strokeRect(76, 96, 100, 78);
        ctx.fillStyle = '#fff'; ctx.fillRect(92, 112, 68, 44);
        ctx.font = '26px "Segoe UI Emoji", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('⚙️❤️⚡', 126, 134);
        ctx.fillStyle = '#78909c';
        ctx.fillRect(88, 178, 28, 54); ctx.strokeRect(88, 178, 28, 54);
        ctx.fillRect(136, 178, 28, 54); ctx.strokeRect(136, 178, 28, 54);
      } else {
        drawStyle0Scene(ctx, W, H, seedIdx, rows, cols);
      }

      // Başlangıç, Kolay ve Orta (hideHints === false) seviyelerinde parça ipucu etiketleri baştaki gibi gösterilir; Zor ve Uzman'da gizlenir!
      const tw = W / cols, th = H / rows;
      const turtleNames2x2 = ['🐢 Baş & Sol Ön Ayak', '🐢 Baş & Sağ Ön Ayak', '🐾 Kabuk & Sol Arka', '🐾 Kabuk & Sağ Arka'];
      const partNames2x3 = ['1·Sol Üst', '2·Baş & Orta', '3·Sağ Üst', '4·Sol Alt', '5·Orta Gövde', '6·Sağ Alt'];
      const partNames3x3 = ['1·Sol Üst', '2·Üst Baş', '3·Sağ Üst', '4·Sol Kol', '5·Merkez Gövde', '6·Sağ Kol', '7·Sol Ayak', '8·Alt Orta', '9·Sağ Ayak'];
      ctx.strokeStyle = 'rgba(216, 67, 21, 0.65)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * tw, y = r * th;
          ctx.strokeRect(x + 2, y + 2, tw - 4, th - 4);
          if (!hideHints && rows * cols <= 9) {
            const idx = r * cols + c;
            const lbl = (rows === 2 && cols === 2)
              ? turtleNames2x2[idx]
              : ((rows === 2 && cols === 3) ? partNames2x3[idx] : (partNames3x3[idx] || `Parça ${idx + 1}`));
            if (lbl) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.86)';
              ctx.fillRect(x + 4, y + th - 19, tw - 8, 14);
              ctx.fillStyle = '#bf360c';
              ctx.font = '800 8.5px "Segoe UI", Arial, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(lbl, x + tw / 2, y + th - 12);
            }
          }
        }
      }
      ctx.setLineDash([]);
    }

    // FORMAT 2 (🔢 Sayı Sıralamalı Şerit Yapboz): Başlangıç, Kolay ve Orta'da sayı şeritli; Zor ve Uzman'da sayı ipucusuz!
    function drawStyle2PipeTracks(ctx, W, H, rows, cols, seedIdx, hideHints = false) {
      const picH = hideHints ? H : Math.floor(H * 0.78);
      const barH = H - picH;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, picH);
      ctx.clip();
      if (seedIdx === 0) {
        drawStyle1TangramMandala(ctx, W, picH, 0, 1, cols, true);
      } else {
        drawStyle0Scene(ctx, W, picH, seedIdx, 1, cols);
      }
      ctx.restore();

      const stripW = W / cols;
      const numColors = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#00acc1', '#1e88e5', '#8e24aa', '#d81b60', '#6d4c41', '#00897b'];
      for (let c = 0; c < cols; c++) {
        const sx = c * stripW;
        if (c > 0) {
          ctx.strokeStyle = 'rgba(255,255,255,0.85)';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
          ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke();
          ctx.setLineDash([]);
        }
        // Başlangıç, Kolay ve Orta seviyelerinde (hideHints === false) alt sayı ipucu kutusu çizilir
        if (!hideHints && barH > 0) {
          ctx.fillStyle = numColors[c % numColors.length];
          ctx.fillRect(sx, picH, stripW, barH);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(sx + 1, picH + 1, stripW - 2, barH - 2);

          ctx.fillStyle = '#ffffff';
          const rad = Math.min(stripW * 0.38, barH * 0.38);
          ctx.beginPath();
          ctx.arc(sx + stripW / 2, picH + barH / 2, rad, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#1a237e';
          ctx.font = `900 ${Math.max(12, Math.floor(rad * 1.25))}px "Segoe UI", Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(c + 1), sx + stripW / 2, picH + barH / 2 + 1);
        }
      }
    }

    // FORMAT 3 (✂️ Kare Kesimli Çalışma Kağıdı): Başlangıç, Kolay ve Orta'da köşe sıra numaralı; Zor ve Uzman'da ipucusuz!
    function drawStyle3PatternMatrix(ctx, W, H, rows, cols, seedIdx, hideHints = false) {
      drawStyle0Scene(ctx, W, H, seedIdx + 2, rows, cols);

      const tileW = W / cols;
      const tileH = H / rows;
      const edgeColors = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#00acc1', '#1e88e5', '#8e24aa', '#d81b60'];

      const rad = Math.max(8, Math.min(tileW, tileH) * 0.16);
      let colorCounter = seedIdx;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * tileW, y = r * tileH;
          if (c < cols - 1) {
            ctx.fillStyle = edgeColors[colorCounter++ % edgeColors.length];
            ctx.beginPath(); ctx.arc(x + tileW, y + tileH / 2, rad, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
          }
          if (r < rows - 1) {
            ctx.fillStyle = edgeColors[colorCounter++ % edgeColors.length];
            ctx.beginPath(); ctx.arc(x + tileW / 2, y + tileH, rad, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
          }
        }
      }

      let seq = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * tileW, y = r * tileH;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.setLineDash([7, 5]);
          ctx.strokeRect(x + 1.5, y + 1.5, tileW - 3, tileH - 3);
          ctx.setLineDash([]);

          if (!hideHints) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.beginPath(); ctx.arc(x + 14, y + 14, 10, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#d84315';
            ctx.font = '900 10px "Segoe UI", Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(seq), x + 14, y + 14);
          }
          seq++;
        }
      }
    }

    // Stil 4: 🎯 Canlı ABC Bağlamaca Bulmacası Yapbozu (Ekrandaki aktif bulmacanın renkli çözüm yollarını yapboza dönüştürür)
    function drawStyle4LiveAbcPuzzle(ctx, W, H) {
      const n = (typeof size === 'number' && size >= 3) ? size : 5;
      const pad = 22;
      const step = (W - pad * 2) / (n - 1);

      // Zemin ve ızgara dokusu
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(30, 58, 138, 0.14)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < n; i++) {
        const pos = pad + i * step;
        ctx.beginPath(); ctx.moveTo(pos, pad); ctx.lineTo(pos, H - pad); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(pad, pos); ctx.lineTo(W - pad, pos); ctx.stroke();
      }

      // Ekrandaki bulmacanın çözüm yolları (solution)
      const activeLetters = (Array.isArray(letters) && letters.length) ? letters : ['A', 'B', 'C'];
      activeLetters.forEach(l => {
        const solPath = (solution && Array.isArray(solution[l]) && solution[l].length) ? solution[l] : (paths && paths[l] ? paths[l] : []);
        if (solPath.length > 1) {
          ctx.strokeStyle = (typeof PATH_COLORS === 'object' && PATH_COLORS[l]) ? PATH_COLORS[l] : '#1e88e5';
          ctx.lineWidth = Math.max(8, step * 0.34);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          solPath.forEach(([r, c], idx) => {
            const px = pad + c * step;
            const py = pad + r * step;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
        }
      });

      // Engel blokları
      if (Array.isArray(obstacles)) {
        const obsS = Math.max(14, step * 0.52);
        obstacles.forEach(([r, c]) => {
          const px = pad + c * step, py = pad + r * step;
          ctx.fillStyle = '#37474f';
          ctx.fillRect(px - obsS / 2, py - obsS / 2, obsS, obsS);
        });
      }

      // Harf / Sembol Uç Noktaları
      const badgeR = Math.max(10, step * 0.28);
      activeLetters.forEach(l => {
        const solPath = (solution && Array.isArray(solution[l]) && solution[l].length) ? solution[l] : [];
        if (solPath.length >= 2) {
          const ends = [solPath[0], solPath[solPath.length - 1]];
          const col = (typeof PATH_COLORS === 'object' && PATH_COLORS[l]) ? PATH_COLORS[l] : '#1e88e5';
          const sym = (typeof getSymbol === 'function') ? getSymbol(l, false) : l;
          ends.forEach(([r, c]) => {
            const px = pad + c * step, py = pad + r * step;
            ctx.fillStyle = col;
            ctx.beginPath(); ctx.arc(px, py, badgeR, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.stroke();
            ctx.fillStyle = '#ffffff';
            ctx.font = `900 ${Math.max(11, Math.floor(badgeR * 1.15))}px "Segoe UI", Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(sym, px, py);
          });
        }
      });
    }

    function drawJigsawScene() {
      const { lvlObj, tierObj, styleIdx } = getActiveJigsawConfig();
      const hideHints = tierObj.id >= 3; // Yalnızca Zor (3) ve Uzman (4) seviyelerinde ipuçları gizlenir; Başlangıç, Kolay ve Orta'da baştaki gibi açık!
      const W = JIGSAW_LOGICAL_SIZE, H = JIGSAW_LOGICAL_SIZE;
      const scaleF = JIGSAW_CANVAS_SIZE / JIGSAW_LOGICAL_SIZE;
      const ctx = jigsawMasterCanvas.getContext('2d');
      ctx.save();
      ctx.setTransform(scaleF, 0, 0, scaleF, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (styleIdx === 0) {
        drawStyle0Scene(ctx, W, H, lvlObj.scene, tierObj.rows, tierObj.cols);
      } else if (styleIdx === 1) {
        drawStyle1TangramMandala(ctx, W, H, lvlObj.scene, tierObj.rows, tierObj.cols, hideHints);
      } else if (styleIdx === 2) {
        drawStyle2PipeTracks(ctx, W, H, tierObj.rows, tierObj.cols, lvlObj.scene, hideHints);
      } else if (styleIdx === 4) {
        drawStyle4LiveAbcPuzzle(ctx, W, H);
      } else {
        drawStyle3PatternMatrix(ctx, W, H, tierObj.rows, tierObj.cols, lvlObj.scene, hideHints);
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, W - 4, H - 4);
      ctx.restore();

      if (jigsawGhostCanvas) {
        const gctx = jigsawGhostCanvas.getContext('2d');
        gctx.clearRect(0, 0, JIGSAW_CANVAS_SIZE, JIGSAW_CANVAS_SIZE);
        gctx.drawImage(jigsawMasterCanvas, 0, 0);
        if (tierObj.cutType === 'interlock') {
          const tw = JIGSAW_CANVAS_SIZE / tierObj.cols;
          const th = JIGSAW_CANVAS_SIZE / tierObj.rows;
          gctx.save();
          gctx.strokeStyle = 'rgba(255, 248, 225, 0.85)';
          gctx.lineWidth = 2.5;
          for (let r = 0; r < tierObj.rows; r++) {
            for (let c = 0; c < tierObj.cols; c++) {
              const edges = getInterlockEdges(r, c, tierObj.rows, tierObj.cols);
              traceInterlockingPiecePath(gctx, c * tw, r * th, tw, th, edges);
              gctx.stroke();
            }
          }
          gctx.restore();
        }
      }

      // Zor (3) ve Uzman (4) seviyeleri için yandaki genel yapılmış görsel tuvalini güncelle
      if (jigsawRefCanvas) {
        const rctx = jigsawRefCanvas.getContext('2d');
        rctx.clearRect(0, 0, JIGSAW_CANVAS_SIZE, JIGSAW_CANVAS_SIZE);
        rctx.drawImage(jigsawMasterCanvas, 0, 0);
      }
    }

    function createPieceCanvas(pieceId, rows, cols, cutType) {
      const r = Math.floor(pieceId / cols);
      const c = pieceId % cols;
      const tileW = Math.floor(JIGSAW_CANVAS_SIZE / cols);
      const tileH = Math.floor(JIGSAW_CANVAS_SIZE / rows);

      if (cutType === 'interlock') {
        const padX = Math.round(tileW * 0.20);
        const padY = Math.round(tileH * 0.20);
        const cv = document.createElement('canvas');
        cv.width = tileW + padX * 2;
        cv.height = tileH + padY * 2;
        const ctx = cv.getContext('2d');
        const edges = getInterlockEdges(r, c, rows, cols);

        ctx.save();
        traceInterlockingPiecePath(ctx, padX, padY, tileW, tileH, edges);
        ctx.clip();
        ctx.drawImage(
          jigsawMasterCanvas,
          c * tileW - padX, r * tileH - padY, tileW + padX * 2, tileH + padY * 2,
          0, 0, tileW + padX * 2, tileH + padY * 2
        );
        ctx.restore();

        // 3B Ahşap/Karton Kilitli Yapboz Kenar Konturu ve Parlaklığı
        traceInterlockingPiecePath(ctx, padX, padY, tileW, tileH, edges);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.strokeStyle = 'rgba(35, 20, 10, 0.72)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
        return cv;
      }

      const cv = document.createElement('canvas');
      cv.width = tileW;
      cv.height = tileH;
      const ctx = cv.getContext('2d');
      ctx.drawImage(jigsawMasterCanvas, c * tileW, r * tileH, tileW, tileH, 0, 0, tileW, tileH);

      if (cutType === 'scissors') {
        ctx.strokeStyle = '#d84315';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(2, 2, tileW - 4, tileH - 4);
        ctx.setLineDash([]);
      } else if (cutType === 'strip') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(1.5, 1.5, tileW - 3, tileH - 3);
      } else {
        ctx.strokeStyle = 'rgba(46, 125, 50, 0.85)';
        ctx.lineWidth = 3;
        ctx.setLineDash([7, 5]);
        ctx.strokeRect(2, 2, tileW - 4, tileH - 4);
        ctx.setLineDash([]);
      }
      return cv;
    }

    function ensureJigsawProgress() {
      if (!appData.jigsawCompletedLevels || typeof appData.jigsawCompletedLevels !== 'object') {
        appData.jigsawCompletedLevels = {};
      }
      if (!appData.jigsawEndlessWins || typeof appData.jigsawEndlessWins !== 'object') {
        appData.jigsawEndlessWins = { 3: 0, 4: 0 };
      }
      return appData.jigsawCompletedLevels;
    }

    function updateJigsawScoreBadge() {
      const doneMap = ensureJigsawProgress();
      const doneCount = Object.keys(doneMap).length;
      const endlessTotal = ((appData.jigsawEndlessWins && appData.jigsawEndlessWins[3]) || 0) +
                           ((appData.jigsawEndlessWins && appData.jigsawEndlessWins[4]) || 0);
      if (jigsawScoreBadge) {
        jigsawScoreBadge.textContent = endlessTotal > 0
          ? `⭐ ${doneCount} Seviye · ♾️ ${endlessTotal} Sonsuz`
          : `⭐ ${doneCount} / ${JIGSAW_LEVELS.length} Seviye`;
      }
    }

    const JIGSAW_STYLE_SHORT_LABELS = [
      '🚗 Kilitli',
      '🐢 Birleştir',
      '🔢 Şerit',
      '✂️ Kare',
      '🎯 ABC'
    ];

    function closeAllJigsawMenus() {
      if (jigsawTierPanel) jigsawTierPanel.classList.remove('show');
      if (jigsawLevelPanel) jigsawLevelPanel.classList.remove('show');
      if (jigsawStylePanel) jigsawStylePanel.classList.remove('show');
      if ( btnJigsawTierGroup) btnJigsawTierGroup.classList.remove('open');
      if (btnJigsawLevelGroup) btnJigsawLevelGroup.classList.remove('open');
      if (btnJigsawStyleGroup) btnJigsawStyleGroup.classList.remove('open');
      if (jigsawDropdownBackdrop) jigsawDropdownBackdrop.classList.remove('show');
    }

    function toggleJigsawMenu(menuType) {
      const map = {
        tier:  { panel: jigsawTierPanel,  btn: btnJigsawTierGroup },
        level: { panel: jigsawLevelPanel, btn: btnJigsawLevelGroup },
        style: { panel: jigsawStylePanel, btn: btnJigsawStyleGroup }
      };
      const target = map[menuType];
      if (!target || !target.panel) return;
      const isAlreadyOpen = target.panel.classList.contains('show');
      closeAllJigsawMenus();
      if (!isAlreadyOpen) {
        target.panel.classList.add('show');
        if (target.btn) target.btn.classList.add('open');
        if (jigsawDropdownBackdrop) jigsawDropdownBackdrop.classList.add('show');
      }
    }

    function renderJigsawSelectors() {
      const { lvlObj, tierObj, styleIdx } = getActiveJigsawConfig();
      const doneMap = ensureJigsawProgress();
      const eStep = tierObj.endless ? (jigsawEndlessStep[tierObj.id] || 0) : 0;

      // Üst Gruplanmış Ana Buton Etiketlerini Güncelle
      if (jigsawTierBtnLabel) {
        jigsawTierBtnLabel.textContent = `${tierObj.label} ▾`;
      }
      if (jigsawLevelBtnLabel) {
        if (tierObj.endless) {
          const tierLevels = JIGSAW_LEVELS.filter(l => l.tier === tierObj.id);
          const tIdx = Math.max(0, tierLevels.findIndex(l => l.lvl === lvlObj.lvl));
          jigsawLevelBtnLabel.textContent = eStep > 0
            ? `♾️ Sonsuz #${lvlObj.endlessNum} ▾`
            : `🧩 Tema ${tIdx + 1} ▾`;
        } else {
          const isCurDone = !!doneMap['L' + lvlObj.lvl];
          jigsawLevelBtnLabel.textContent = `${isCurDone ? '⭐' : '🧩'} Seviye ${lvlObj.lvl} ▾`;
        }
      }
      if (jigsawStyleBtnLabel) {
        const shortSt = JIGSAW_STYLE_SHORT_LABELS[styleIdx] || '🚗 Kilitli';
        jigsawStyleBtnLabel.textContent = `${shortSt} ▾`;
      }

      // 1. Zorluk Kademesi Butonları (5 Kademe: Başlangıç -> Uzman)
      if (jigsawTierBar) {
        jigsawTierBar.innerHTML = JIGSAW_TIERS.map(t => {
          const isAct = t.id === tierObj.id;
          const tierTotalCount = JIGSAW_LEVELS.filter(l => l.tier === t.id).length;
          const tierDoneCount = JIGSAW_LEVELS.filter(l => l.tier === t.id && doneMap['L' + l.lvl]).length;
          const endlessSolved = (appData.jigsawEndlessWins && appData.jigsawEndlessWins[t.id]) || 0;
          const subText = t.endless
            ? `${t.sub} · ♾️ Sonsuz${endlessSolved > 0 ? ' · ⭐' + endlessSolved : ''}`
            : `${t.sub} · ${tierDoneCount}/${tierTotalCount}`;
          return `<button type="button" class="jigsaw-lvl-chip ${isAct ? 'active' : ''} ${(tierDoneCount === tierTotalCount || endlessSolved > 0) ? 'done' : ''}" data-jtier="${t.id}">
            <span>${t.label}</span>
            <span style="opacity:0.85;font-size:0.65rem;">(${subText})</span>
          </button>`;
        }).join('');

        jigsawTierBar.querySelectorAll('button[data-jtier]').forEach(btn => {
          btn.addEventListener('click', () => {
            playClick();
            const tid = parseInt(btn.getAttribute('data-jtier'), 10) || 0;
            const firstInTier = JIGSAW_LEVELS.findIndex(l => l.tier === tid);
            if (firstInTier !== -1) {
              jigsawCurLevelIdx = firstInTier;
              jigsawCustomStyle = null;
              closeAllJigsawMenus();
              initJigsawGame();
            }
          });
        });
      }

      // 2. Kademe İçi Seviye Seçici (Zor ve Uzman'da Sonsuz Yapboz Üreticiyle Birlikte!)
      if (jigsawLevelBar) {
        const tierLevels = JIGSAW_LEVELS.filter(l => l.tier === tierObj.id);
        let html = tierLevels.map((l, i) => {
          const idx = l.lvl - 1;
          const isAct = (idx === jigsawCurLevelIdx && eStep === 0);
          const isDone = !!doneMap['L' + l.lvl];
          const btnLabel = tierObj.endless ? `Tema ${i + 1}` : `Seviye ${l.lvl}`;
          return `<button type="button" class="jigsaw-lvl-chip ${isAct ? 'active' : ''} ${isDone ? 'done' : ''}" data-jlvl="${idx}">
            <span>${isDone ? '⭐' : '🧩'} ${btnLabel}</span>
            <span style="font-size:0.65rem;opacity:0.8;">${isDone ? 'Tamamlandı' : 'Oyna'}</span>
          </button>`;
        }).join('');

        if (tierObj.endless) {
          html += `<button type="button" class="jigsaw-lvl-chip ${eStep > 0 ? 'active' : ''}" id="btnJigsawEndlessGen" style="grid-column: 1 / -1; border-color:#ef6c00;background:${eStep > 0 ? '#ef6c00' : '#fff3e0'};color:${eStep > 0 ? '#fff' : '#e65100'};">
            <span>♾️ Sonsuz Yapboz #${lvlObj.endlessNum}</span>
            <span>🎲 Yeni Üret</span>
          </button>`;
        }
        jigsawLevelBar.innerHTML = html;

        jigsawLevelBar.querySelectorAll('button[data-jlvl]').forEach(btn => {
          btn.addEventListener('click', () => {
            playClick();
            jigsawCurLevelIdx = parseInt(btn.getAttribute('data-jlvl'), 10) || 0;
            if (tierObj.endless) jigsawEndlessStep[tierObj.id] = 0;
            jigsawCustomStyle = null;
            closeAllJigsawMenus();
            initJigsawGame();
          });
        });

        const btnEndlessGen = document.getElementById('btnJigsawEndlessGen');
        if (btnEndlessGen) {
          btnEndlessGen.addEventListener('click', () => {
            playClick();
            jigsawEndlessStep[tierObj.id] = (jigsawEndlessStep[tierObj.id] || 0) + 1;
            closeAllJigsawMenus();
            initJigsawGame();
          });
        }
      }

      // 3. Stil Seçici Aktiflik Durumu
      if (jigsawStyleBar) {
        jigsawStyleBar.querySelectorAll('button[data-jstyle]').forEach(b => {
          const st = parseInt(b.getAttribute('data-jstyle'), 10);
          b.classList.toggle('active', st === styleIdx);
        });
      }

      // 4. Alt İlerleme Butonu Metni (Zor & Uzman'da Sonsuz Yeni Yapboz)
      if (jigsawNextThemeBtn) {
        jigsawNextThemeBtn.innerHTML = tierObj.endless
          ? '♾️ Yeni Yapboz →'
          : '▶️ Sonraki Seviye →';
      }
    }

    function initJigsawGame() {
      jigsawSolvedLock = false;
      jigsawSelectedPiece = null;
      if (jigsawRefPanel) jigsawRefPanel.classList.remove('zoomed-ref');
      const { tierObj } = getActiveJigsawConfig();
      // Başlangıç (0), Kolay (1) ve Orta (2) seviyelerinde ipucu baştaki gibi açık; Zor (3) ve Uzman (4) seviyelerinde kapalı!
      jigsawShowGhost = tierObj.id < 3;
      drawJigsawScene();
      const total = tierObj.rows * tierObj.cols;
      jigsawBoardState = new Array(total).fill(null);
      jigsawTrayState = Array.from({ length: total }, (_, i) => i);
      for (let i = jigsawTrayState.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = jigsawTrayState[i];
        jigsawTrayState[i] = jigsawTrayState[j];
        jigsawTrayState[j] = tmp;
      }
      renderJigsawSelectors();
      renderJigsawUI();
    }

    function moveJigsawPiece(pieceId, targetSlotIdx) {
      if (jigsawSolvedLock) return;
      const oldSlotIdx = jigsawBoardState.indexOf(pieceId);
      const oldTrayIdx = jigsawTrayState.indexOf(pieceId);
      const snappedCorrect = (targetSlotIdx === pieceId && oldSlotIdx !== pieceId);

      if (targetSlotIdx === null || targetSlotIdx === undefined || targetSlotIdx < 0) {
        if (oldSlotIdx !== -1) jigsawBoardState[oldSlotIdx] = null;
        if (oldTrayIdx === -1) jigsawTrayState.push(pieceId);
      } else {
        const existingPiece = jigsawBoardState[targetSlotIdx];
        if (oldSlotIdx !== -1) {
          jigsawBoardState[oldSlotIdx] = existingPiece;
        } else {
          if (oldTrayIdx !== -1) jigsawTrayState.splice(oldTrayIdx, 1);
          if (existingPiece !== null && !jigsawTrayState.includes(existingPiece)) {
            jigsawTrayState.push(existingPiece);
          }
        }
        jigsawBoardState[targetSlotIdx] = pieceId;
      }

      jigsawSelectedPiece = null;
      if (snappedCorrect && typeof playConnectNote === 'function') {
        playConnectNote((pieceId % 7) + 1);
      } else {
        playClick();
      }
      renderJigsawUI();
      if (snappedCorrect && jigsawBoardGrid) {
        const slotEl = jigsawBoardGrid.querySelector(`.jigsaw-slot[data-slot="${targetSlotIdx}"]`);
        if (slotEl) slotEl.classList.add('snap-pop');
      }
      checkJigsawWin();
    }

    function checkJigsawWin() {
      if (jigsawSolvedLock) return;
      const { lvlObj, tierObj } = getActiveJigsawConfig();
      const total = tierObj.rows * tierObj.cols;
      for (let i = 0; i < total; i++) {
        if (jigsawBoardState[i] !== i) return;
      }
      jigsawSolvedLock = true;
      const bonusPts = tierObj.bonus;
      const doneMap = ensureJigsawProgress();
      doneMap['L' + lvlObj.lvl] = true;
      if (tierObj.endless) {
        appData.jigsawEndlessWins[tierObj.id] = (appData.jigsawEndlessWins[tierObj.id] || 0) + 1;
      }
      appData.jigsawWins = (appData.jigsawWins || 0) + 1;
      appData.score = (appData.score || 0) + bonusPts;
      if (typeof ensureLeagueWeekSync === 'function') ensureLeagueWeekSync();
      appData.weeklyLeagueScore = (appData.weeklyLeagueScore || 0) + bonusPts;
      saveAppData();
      updateStatsUI();
      updateJigsawScoreBadge();
      renderJigsawSelectors();
      if (typeof updateProfileButtonUI === 'function') updateProfileButtonUI();
      if (typeof syncPlayerToCloudLeaderboard === 'function') syncPlayerToCloudLeaderboard(false);

      playSuccess();
      spawnConfetti();
      if (jigsawStatus) {
        if (tierObj.endless) {
          jigsawStatus.innerHTML = `🎉 <strong>Sonsuz Yapboz #${lvlObj.endlessNum} Tamamlandı!</strong> <strong>+${bonusPts} Puan!</strong> Sıradaki için <strong>"♾️ Yeni Yapboz →"</strong> butonuna bas!`;
        } else {
          const nextLvl = (jigsawCurLevelIdx + 1 < JIGSAW_LEVELS.length) ? (lvlObj.lvl + 1) : 1;
          jigsawStatus.innerHTML = `🎉 <strong>Seviye ${lvlObj.lvl} Tamamlandı!</strong> <strong>+${bonusPts} Akıl Puanı!</strong> Şimdi <strong>Seviye ${nextLvl}</strong>'e geçebilirsin.`;
        }
      }
    }

    function bindPieceDragAndTap(pieceEl, pieceId) {
      pieceEl.addEventListener('pointerdown', (ev) => {
        if (jigsawSolvedLock) return;
        ev.preventDefault();
        ev.stopPropagation();

        const { tierObj } = getActiveJigsawConfig();
        const startX = ev.clientX;
        const startY = ev.clientY;
        let moved = false;
        let floater = null;
        const rect = pieceEl.getBoundingClientRect();

        const onMove = (mev) => {
          const dx = mev.clientX - startX;
          const dy = mev.clientY - startY;
          if (!moved && Math.hypot(dx, dy) > 6) {
            moved = true;
            floater = document.createElement('div');
            floater.className = 'jigsaw-floating-drag' + (tierObj.cutType === 'interlock' ? ' interlock-float' : '');
            const baseW = Math.max(44, rect.width);
            const baseH = Math.max(44, rect.height);
            floater.style.width = (tierObj.cutType === 'interlock' ? Math.round(baseW * 1.32) : baseW) + 'px';
            floater.style.height = (tierObj.cutType === 'interlock' ? Math.round(baseH * 1.32) : baseH) + 'px';
            floater.appendChild(createPieceCanvas(pieceId, tierObj.rows, tierObj.cols, tierObj.cutType));
            document.body.appendChild(floater);
            pieceEl.style.opacity = '0.35';
          }
          if (moved && floater) {
            floater.style.left = mev.clientX + 'px';
            floater.style.top = mev.clientY + 'px';
            jigsawBoardGrid.querySelectorAll('.jigsaw-slot').forEach(sl => sl.classList.remove('drag-over'));
            const hit = document.elementFromPoint(mev.clientX, mev.clientY);
            const slotEl = hit && hit.closest ? hit.closest('.jigsaw-slot') : null;
            if (slotEl) slotEl.classList.add('drag-over');
          }
        };

        const onUp = (uev) => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          window.removeEventListener('pointercancel', onUp);
          if (floater) floater.remove();
          pieceEl.style.opacity = '1';
          jigsawBoardGrid.querySelectorAll('.jigsaw-slot').forEach(sl => sl.classList.remove('drag-over'));

          if (moved) {
            const hit = document.elementFromPoint(uev.clientX, uev.clientY);
            const slotEl = hit && hit.closest ? hit.closest('.jigsaw-slot') : null;
            const trayEl = hit && hit.closest ? hit.closest('#jigsawTray') : null;
            if (slotEl) {
              const targetIdx = parseInt(slotEl.getAttribute('data-slot'), 10);
              moveJigsawPiece(pieceId, targetIdx);
            } else if (trayEl) {
              moveJigsawPiece(pieceId, null);
            }
          } else {
            if (jigsawSelectedPiece === pieceId) {
              jigsawSelectedPiece = null;
            } else if (jigsawSelectedPiece !== null) {
              const targetSlot = jigsawBoardState.indexOf(pieceId);
              if (targetSlot !== -1) {
                moveJigsawPiece(jigsawSelectedPiece, targetSlot);
                return;
              }
              jigsawSelectedPiece = pieceId;
            } else {
              jigsawSelectedPiece = pieceId;
            }
            playClick();
            renderJigsawUI();
          }
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
      });
    }

    function renderJigsawUI() {
      if (!jigsawBoardGrid || !jigsawTray) return;
      updateJigsawScoreBadge();
      const { lvlObj, tierObj } = getActiveJigsawConfig();
      const isInterlock = tierObj.cutType === 'interlock';
      const isScissors = tierObj.cutType === 'scissors';
      const isStrip = tierObj.cutType === 'strip';
      const isHintFreeTier = tierObj.id >= 3; // Zor (3) ve Uzman (4): İpucusuz + Yanda Yapılmış Görsel

      if (jigsawStage) {
        jigsawStage.classList.toggle('has-ref-panel', isHintFreeTier);
      }
      if (jigsawRefPanel) {
        jigsawRefPanel.style.display = isHintFreeTier ? 'flex' : 'none';
      }
      if (jigsawRefSub && isHintFreeTier) {
        const isZoomed = jigsawRefPanel && jigsawRefPanel.classList.contains('zoomed-ref');
        jigsawRefSub.textContent = isZoomed
          ? `Küçültmek İçin Dokun ✕`
          : `Bakarak Yap · #${lvlObj.endlessNum} (🔍 Büyüt)`;
      }

      if (jigsawBoardWrap) {
        jigsawBoardWrap.classList.toggle('wood-board', isInterlock);
      }
      if (jigsawGhostCanvas) {
        jigsawGhostCanvas.classList.toggle('hide-ghost', isHintFreeTier || !jigsawShowGhost);
      }
      if (jigsawGroupBar) {
        jigsawGroupBar.classList.toggle('no-ghost-btn', isHintFreeTier);
      }
      if (btnJigsawGhost) {
        btnJigsawGhost.style.display = isHintFreeTier ? 'none' : '';
        btnJigsawGhost.classList.toggle('ghost-off', !jigsawShowGhost);
        if (jigsawGhostBtnLabel) {
          jigsawGhostBtnLabel.textContent = jigsawShowGhost ? '👁️ Açık' : '👁️ Gizli';
        }
      }

      jigsawBoardGrid.classList.toggle('interlock-grid', isInterlock);
      jigsawBoardGrid.style.gridTemplateColumns = `repeat(${tierObj.cols}, 1fr)`;
      jigsawBoardGrid.style.gridTemplateRows = `repeat(${tierObj.rows}, 1fr)`;
      jigsawBoardGrid.innerHTML = '';

      const total = tierObj.rows * tierObj.cols;
      let correctCount = 0;

      for (let s = 0; s < total; s++) {
        const slot = document.createElement('div');
        const pId = jigsawBoardState[s];
        const isCorrect = pId === s;
        const isFilled = (pId !== null && pId !== undefined);
        if (isCorrect) correctCount++;

        let slotCls = 'jigsaw-slot';
        if (isInterlock) slotCls += ' interlock-slot';
        if (isScissors) slotCls += ' scissors-slot';
        if (isFilled) slotCls += ' filled-slot';
        if (isCorrect) slotCls += ' correct-lock';
        if (isFilled && jigsawSelectedPiece === pId) slotCls += ' selected-slot';
        slot.className = slotCls;
        slot.setAttribute('data-slot', String(s));

        if (isFilled) {
          const pEl = document.createElement('div');
          pEl.className = 'jigsaw-piece' +
            (isInterlock ? ' interlock-board-piece' : '') +
            (jigsawSelectedPiece === pId ? ' selected-piece' : '');
          pEl.appendChild(createPieceCanvas(pId, tierObj.rows, tierObj.cols, tierObj.cutType));
          slot.appendChild(pEl);
          bindPieceDragAndTap(slot, pId);
        } else {
          // Başlangıç (0), Kolay (1) ve Orta (2) seviyelerinde boş yuva sıra numarası ipucu baştaki gibi gösterilir; Zor ve Uzman'da gizlenir!
          if (!isHintFreeTier) {
            const numHint = document.createElement('span');
            numHint.style.cssText = 'font-size:0.85rem;font-weight:900;color:rgba(30,58,138,0.45);pointer-events:none;';
            numHint.textContent = String(s + 1);
            slot.appendChild(numHint);
          }
          slot.addEventListener('click', () => {
            if (jigsawSelectedPiece !== null) {
              moveJigsawPiece(jigsawSelectedPiece, s);
            }
          });
        }
        jigsawBoardGrid.appendChild(slot);
      }

      const isMobilePhone = window.innerWidth <= 560;
      const boardPx = Math.max(210, (jigsawBoardGrid && jigsawBoardGrid.clientWidth) ? jigsawBoardGrid.clientWidth : 280);
      const scaleRatio = (isMobilePhone && total >= 9) ? 0.62 : 0.74;
      const trayW = isStrip
        ? Math.max(28, Math.floor((boardPx * (isMobilePhone ? 0.82 : 0.90)) / tierObj.cols))
        : Math.max(44, Math.floor((boardPx * scaleRatio) / tierObj.cols));
      const trayH = isStrip
        ? Math.max(96, Math.floor(boardPx * (isMobilePhone ? 0.38 : 0.48)))
        : Math.max(44, Math.floor((boardPx * scaleRatio) / tierObj.rows));

      jigsawTray.innerHTML = '';
      jigsawTrayState.forEach(pId => {
        const pEl = document.createElement('div');
        pEl.className = 'jigsaw-piece' +
          (isInterlock ? ' interlock-tray-piece' : '') +
          (isScissors ? ' scissors-tray-piece' : '') +
          (jigsawSelectedPiece === pId ? ' selected-piece' : '');
        pEl.style.width = (isInterlock ? Math.round(trayW * 1.22) : trayW) + 'px';
        pEl.style.height = (isInterlock ? Math.round(trayH * 1.22) : trayH) + 'px';
        pEl.appendChild(createPieceCanvas(pId, tierObj.rows, tierObj.cols, tierObj.cutType));
        bindPieceDragAndTap(pEl, pId);
        jigsawTray.appendChild(pEl);
      });

      if (!jigsawSolvedLock && jigsawStatus) {
        if (jigsawSelectedPiece !== null) {
          jigsawStatus.innerHTML = `✨ Parça seçildi! Tahtada yerleştirmek istediğin <strong>kareye dokun</strong> veya sürükle.`;
        } else if (isHintFreeTier) {
          jigsawStatus.innerHTML = `🖼️ <strong>Görsele Bakarak Birleştir:</strong> ${lvlObj.title} · Doğru: <strong>${correctCount}/${total}</strong>`;
        } else {
          jigsawStatus.innerHTML = `<strong>${lvlObj.title}</strong> · Doğru: <strong>${correctCount}/${total}</strong>`;
        }
      }
    }

    function openJigsawModal() {
      const doneMap = ensureJigsawProgress();
      const firstUnsolved = JIGSAW_LEVELS.findIndex(l => !doneMap['L' + l.lvl]);
      if (firstUnsolved !== -1) jigsawCurLevelIdx = firstUnsolved;
      jigsawCustomStyle = null;
      closeAllJigsawMenus();
      if (jigsawOverlay) jigsawOverlay.classList.add('show');
      if (jigsawModal) jigsawModal.classList.add('show');
      initJigsawGame();
      requestAnimationFrame(() => renderJigsawUI());
    }
    function closeJigsawModal() {
      closeAllJigsawMenus();
      if (jigsawRefPanel) jigsawRefPanel.classList.remove('zoomed-ref');
      if (jigsawOverlay) jigsawOverlay.classList.remove('show');
      if (jigsawModal) jigsawModal.classList.remove('show');
    }

    const jigsawBackHomeBtn = document.getElementById('jigsawBackHomeBtn');
    const btnJigsawFullscreen = document.getElementById('btnJigsawFullscreen');
    if (btnJigsaw) btnJigsaw.addEventListener('click', () => { playClick(); openJigsawModal(); });
    if (jigsawClose) jigsawClose.addEventListener('click', () => { playClick(); closeJigsawModal(); });
    if (jigsawBackHomeBtn) jigsawBackHomeBtn.addEventListener('click', () => { playClick(); closeJigsawModal(); });

    // Gruplanmış Açılır Menü Buton Dinleyicileri (Zorluk, Bölüm/Tema, Stil)
    if (btnJigsawTierGroup) {
      btnJigsawTierGroup.addEventListener('click', (e) => {
        e.stopPropagation();
        playClick();
        toggleJigsawMenu('tier');
      });
    }
    if (btnJigsawLevelGroup) {
      btnJigsawLevelGroup.addEventListener('click', (e) => {
        e.stopPropagation();
        playClick();
        toggleJigsawMenu('level');
      });
    }
    if (btnJigsawStyleGroup) {
      btnJigsawStyleGroup.addEventListener('click', (e) => {
        e.stopPropagation();
        playClick();
        toggleJigsawMenu('style');
      });
    }
    if (jigsawDropdownBackdrop) {
      jigsawDropdownBackdrop.addEventListener('click', () => {
        playClick();
        closeAllJigsawMenus();
      });
    }
    document.querySelectorAll('.jigsaw-dropdown-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playClick();
        closeAllJigsawMenus();
      });
    });

    // Zor ve Uzman modda örnek görsele dokununca büyüt/küçült (Telefonda rahat inceleme)
    if (jigsawRefPanel) {
      jigsawRefPanel.addEventListener('click', () => {
        playClick();
        jigsawRefPanel.classList.toggle('zoomed-ref');
        renderJigsawUI();
      });
    }

    if (btnJigsawFullscreen) {
      btnJigsawFullscreen.addEventListener('click', () => {
        playClick();
        if (!document.fullscreenElement) {
          const el = document.documentElement;
          if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
        } else if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      });
    }
    window.addEventListener('resize', () => {
      if (jigsawModal && jigsawModal.classList.contains('show')) {
        renderJigsawUI();
      }
    });
    if (jigsawOverlay) jigsawOverlay.addEventListener('click', closeJigsawModal);
    if (jigsawShuffleBtn) jigsawShuffleBtn.addEventListener('click', () => { playClick(); closeAllJigsawMenus(); initJigsawGame(); });
    if (jigsawNextThemeBtn) {
      jigsawNextThemeBtn.addEventListener('click', () => {
        playClick();
        closeAllJigsawMenus();
        const { tierObj } = getActiveJigsawConfig();
        if (tierObj.endless) {
          // Zor ve Uzman kademelerinde sonsuz sayıda yeni yapboz üretir!
          jigsawEndlessStep[tierObj.id] = (jigsawEndlessStep[tierObj.id] || 0) + 1;
          initJigsawGame();
        } else {
          jigsawCurLevelIdx = (jigsawCurLevelIdx + 1) % JIGSAW_LEVELS.length;
          jigsawCustomStyle = null;
          initJigsawGame();
        }
      });
    }
    if (btnJigsawGhost) {
      btnJigsawGhost.addEventListener('click', () => {
        playClick();
        closeAllJigsawMenus();
        jigsawShowGhost = !jigsawShowGhost;
        renderJigsawUI();
      });
    }
    if (jigsawStyleBar) {
      jigsawStyleBar.querySelectorAll('button[data-jstyle]').forEach(btn => {
        btn.addEventListener('click', () => {
          playClick();
          jigsawCustomStyle = parseInt(btn.getAttribute('data-jstyle'), 10);
          closeAllJigsawMenus();
          initJigsawGame();
        });
      });
    }

    // --- ADIM 3: "KENDİ BULMACANI TASARLA" (SANDBOX / ÜRETİM MODU + ENGEL BLOKU DESTEĞİ) ---
    const btnCreator = document.getElementById('btnCreator');
    const creatorOverlay = document.getElementById('creatorOverlay');
    const creatorModal = document.getElementById('creatorModal');
    const creatorSizeRow = document.getElementById('creatorSizeRow');
    const creatorPalette = document.getElementById('creatorLetterPalette');
    const creatorGridEl = document.getElementById('creatorGrid');
    const creatorStatusEl = document.getElementById('creatorStatus');
    const creatorClose = document.getElementById('creatorClose');
    const creatorClear = document.getElementById('btnCreatorClear');
    const creatorAuto = document.getElementById('btnCreatorAuto');
    const creatorPlay = document.getElementById('creatorPlayBtn');
    const creatorShare = document.getElementById('creatorShareBtn');

    let creatorN = 5;
    let creatorSelectedLetter = 'A';
    let creatorCells = {}; // key: "r,c" -> letter ('A'..'E' veya 'ENGEL')
    let creatorLastGeneratedPuzzle = null;

    function renderCreatorPalette() {
      if (!creatorPalette) return;
      const paletteLetters = ['A', 'B', 'C', 'D', 'E', 'ENGEL', 'SIL'];
      creatorPalette.innerHTML = paletteLetters.map(l => {
        const isEraser = l === 'SIL';
        const isObs = l === 'ENGEL';
        const count = (isEraser) ? 0 : Object.values(creatorCells).filter(v => v === l).length;
        const active = creatorSelectedLetter === l;
        const color = isEraser ? '#546e7a' : (isObs ? '#37474f' : PATH_COLORS[l]);
        const label = isEraser ? '🧹 Silgi' : (isObs ? `🧱 Engel (${count}/2)` : `${l} (${count}/2)`);
        return `<button type="button" class="pal-btn ${active ? 'active' : ''}" data-l="${l}" style="${active ? `background:${color};border-color:${color};color:#fff;` : `border-color:${color};color:${color};`}">
          ${label}
        </button>`;
      }).join('');

      creatorPalette.querySelectorAll('.pal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          playClick();
          creatorSelectedLetter = btn.getAttribute('data-l');
          renderCreatorPalette();
        });
      });
    }

    // Kullanıcının elle yerleştirdiği harfler ve engeller için kesişmeyen ve tahtayı dolduran geçerli yol çözücü
    function solveCustomGrid(n, cellsMap, activeLetters) {
      const pairs = activeLetters.map(l => {
        const pts = Object.keys(cellsMap)
          .filter(k => cellsMap[k] === l)
          .map(k => {
            const [r, c] = k.split(',').map(Number);
            return r * n + c;
          });
        return { l, start: pts[0], end: pts[1] };
      });

      const userObstacles = Object.keys(cellsMap)
        .filter(k => cellsMap[k] === 'ENGEL')
        .map(k => {
          const [r, c] = k.split(',').map(Number);
          return r * n + c;
        });

      const totalCells = n * n;
      const visited = new Uint8Array(totalCells);
      pairs.forEach(p => { visited[p.start] = 1; visited[p.end] = 1; });
      userObstacles.forEach(idx => { visited[idx] = 1; });

      function getNeighbors(idx) {
        const r = (idx / n) | 0, c = idx % n;
        const out = [];
        if (r > 0) out.push((r - 1) * n + c);
        if (r < n - 1) out.push((r + 1) * n + c);
        if (c > 0) out.push(r * n + (c - 1));
        if (c < n - 1) out.push(r * n + (c + 1));
        return out;
      }

      // Mesafesi en kısa olan çiftlerden başlayarak sırala
      const order = pairs.slice().sort((a, b) => manhattanIdx(a.start, a.end, n) - manhattanIdx(b.start, b.end, n));
      const foundPaths = {};

      function findDisjointPaths(pIdx) {
        if (pIdx >= order.length) return true;
        const { l, start, end } = order[pIdx];
        const queue = [[start]];
        const candidateRoutes = [];
        const seenLen = new Int16Array(totalCells);
        seenLen.fill(999);
        seenLen[start] = 0;

        while (queue.length > 0 && candidateRoutes.length < 8) {
          const curPath = queue.shift();
          const head = curPath[curPath.length - 1];
          if (head === end) {
            candidateRoutes.push(curPath);
            continue;
          }
          if (curPath.length > n * 3) continue;
          const nbrs = getNeighbors(head);
          nbrs.sort((a, b) => manhattanIdx(a, end, n) - manhattanIdx(b, end, n));
          for (const nxt of nbrs) {
            if (nxt !== end && visited[nxt]) continue;
            if (curPath.includes(nxt)) continue;
            if (curPath.length + 1 <= seenLen[nxt] + 2) {
              if (curPath.length + 1 < seenLen[nxt]) seenLen[nxt] = curPath.length + 1;
              queue.push([...curPath, nxt]);
            }
          }
        }

        for (const route of candidateRoutes) {
          for (let i = 1; i < route.length - 1; i++) visited[route[i]] = 1;
          foundPaths[l] = route;
          if (findDisjointPaths(pIdx + 1)) return true;
          for (let i = 1; i < route.length - 1; i++) visited[route[i]] = 0;
        }
        return false;
      }

      if (!findDisjointPaths(0)) return null;

      // 2. Boş kalan komşu nokta çiftlerini (2x1 domino) mevcut yollara esneterek dahil et
      let expanded = true;
      let guard = 0;
      while (expanded && guard++ < 80) {
        expanded = false;
        for (const l of activeLetters) {
          const path = foundPaths[l];
          for (let i = 0; i < path.length - 1; i++) {
            const u = path[i], v = path[i + 1];
            const ur = (u / n) | 0, uc = u % n;
            const vr = (v / n) | 0, vc = v % n;
            if (ur === vr) {
              for (const dr of [-1, 1]) {
                const nr = ur + dr;
                if (nr < 0 || nr >= n) continue;
                const u2 = nr * n + uc, v2 = nr * n + vc;
                if (!visited[u2] && !visited[v2]) {
                  visited[u2] = 1; visited[v2] = 1;
                  path.splice(i + 1, 0, u2, v2);
                  expanded = true;
                  break;
                }
              }
            } else {
              for (const dc of [-1, 1]) {
                const nc = uc + dc;
                if (nc < 0 || nc >= n) continue;
                const u2 = ur * n + nc, v2 = vr * n + nc;
                if (!visited[u2] && !visited[v2]) {
                  visited[u2] = 1; visited[v2] = 1;
                  path.splice(i + 1, 0, u2, v2);
                  expanded = true;
                  break;
                }
              }
            }
            if (expanded) break;
          }
          if (expanded) break;
        }
      }

      // 3. Kullanıcının koyduğu engeller + erişilemeyen tekil hücreleri engel listesine ekle
      const obstaclesList = [...userObstacles];
      for (let idx = 0; idx < totalCells; idx++) {
        if (!visited[idx] && !obstaclesList.includes(idx)) obstaclesList.push(idx);
      }

      return {
        s: n,
        sol: activeLetters.map(l => foundPaths[l]),
        obstacles: obstaclesList,
        score: 160,
        code: 1000
      };
    }

    function renderCreatorGrid() {
      if (!creatorGridEl) return;
      creatorGridEl.style.gridTemplateColumns = `repeat(${creatorN}, 1fr)`;
      let html = '';
      for (let r = 0; r < creatorN; r++) {
        for (let c = 0; c < creatorN; c++) {
          const k = `${r},${c}`;
          const l = creatorCells[k] || '';
          const isObs = l === 'ENGEL';
          const col = isObs ? '#37474f' : (l ? PATH_COLORS[l] : '#263238');
          const sym = isObs ? '⬛' : (l ? getSymbol(l, true) : '');
          html += `<div class="creator-cell ${l ? 'filled' : ''}" data-r="${r}" data-c="${c}" style="color:${col};border-color:${l ? col : '#9fa8da'}">${sym}</div>`;
        }
      }
      creatorGridEl.innerHTML = html;

      const pairsPlaced = ['A', 'B', 'C', 'D', 'E'].filter(l => Object.values(creatorCells).filter(v => v === l).length === 2);
      const obsPlaced = Object.values(creatorCells).filter(v => v === 'ENGEL').length;
      if (creatorStatusEl) {
        if (pairsPlaced.length >= 2) {
          creatorStatusEl.textContent = `🎉 Tasarım Hazır! (${creatorN}×${creatorN} · ${pairsPlaced.length} Çift Harf${obsPlaced ? ` · ${obsPlaced} Engel` : ''}) — "▶️ Tasarımımı Oyna" butonuna basabilirsin!`;
        } else {
          creatorStatusEl.textContent = `Karelere dokunarak en az 2 harf çiftini (ve istersen 🧱 Engel) yerleştir ya da "✨ Otomatik Taslak" seç.`;
        }
      }

      creatorGridEl.querySelectorAll('.creator-cell').forEach(cell => {
        cell.addEventListener('click', () => {
          const r = parseInt(cell.getAttribute('data-r'), 10);
          const c = parseInt(cell.getAttribute('data-c'), 10);
          const k = `${r},${c}`;
          playClick();

          if (creatorSelectedLetter === 'SIL') {
            delete creatorCells[k];
          } else if (creatorCells[k] === creatorSelectedLetter) {
            delete creatorCells[k];
          } else {
            const existing = Object.keys(creatorCells).filter(keyStr => creatorCells[keyStr] === creatorSelectedLetter);
            if (existing.length >= 2) {
              delete creatorCells[existing[0]];
            }
            creatorCells[k] = creatorSelectedLetter;
          }
          creatorLastGeneratedPuzzle = null;
          renderCreatorPalette();
          renderCreatorGrid();
        });
      });
    }

    function loadAutoDraftIntoCreator() {
      creatorCells = {};
      const pairs = creatorN === 4 ? 3 : (creatorN === 5 ? 4 : 5);
      const puz = generatePuzzle(creatorN, pairs, 0.5, null, 60, { gi: 1, li: 2, withObstacles: false });
      if (puz) {
        creatorLastGeneratedPuzzle = puz;
        puz.sol.forEach((cells, idx) => {
          const l = LETTERS[idx];
          const first = cells[0];
          const last = cells[cells.length - 1];
          creatorCells[`${Math.floor(first / creatorN)},${first % creatorN}`] = l;
          creatorCells[`${Math.floor(last / creatorN)},${last % creatorN}`] = l;
        });
      }
      renderCreatorPalette();
      renderCreatorGrid();
    }

    function openCreatorModal() {
      if (Object.keys(creatorCells).length === 0) {
        loadAutoDraftIntoCreator();
      } else {
        renderCreatorPalette();
        renderCreatorGrid();
      }
      creatorOverlay.classList.add('show');
      creatorModal.classList.add('show');
    }
    function closeCreatorModal() {
      creatorOverlay.classList.remove('show');
      creatorModal.classList.remove('show');
    }

    if (btnCreator) btnCreator.addEventListener('click', () => { playClick(); openCreatorModal(); });
    if (creatorClose) creatorClose.addEventListener('click', () => { playClick(); closeCreatorModal(); });
    if (creatorOverlay) creatorOverlay.addEventListener('click', closeCreatorModal);
    if (creatorSizeRow) {
      creatorSizeRow.querySelectorAll('.pal-btn[data-size]').forEach(btn => {
        btn.addEventListener('click', () => {
          playClick();
          creatorN = parseInt(btn.getAttribute('data-size'), 10) || 5;
          creatorSizeRow.querySelectorAll('.pal-btn[data-size]').forEach(b => b.classList.toggle('active', b === btn));
          creatorCells = {};
          creatorLastGeneratedPuzzle = null;
          loadAutoDraftIntoCreator();
        });
      });
    }
    if (creatorClear) {
      creatorClear.addEventListener('click', () => {
        playClick();
        creatorCells = {};
        creatorLastGeneratedPuzzle = null;
        renderCreatorPalette();
        renderCreatorGrid();
      });
    }
    if (creatorAuto) {
      creatorAuto.addEventListener('click', () => {
        playClick();
        loadAutoDraftIntoCreator();
      });
    }
    if (creatorPlay) {
      creatorPlay.addEventListener('click', () => {
        const activeLetters = ['A', 'B', 'C', 'D', 'E'].filter(l => Object.values(creatorCells).filter(v => v === l).length === 2);
        if (activeLetters.length < 2) {
          playError();
          showToast('gentle', '🎨', 'Biraz Daha Harf Ekleyelim', 'Bulmacanı oynamak için en az 2 harf çiftini (örneğin iki adet A ve iki adet B) ızgaraya yerleştir.');
          return;
        }
        playClick();
        let customPuzzle = null;
        if (creatorLastGeneratedPuzzle && creatorLastGeneratedPuzzle.s === creatorN) {
          customPuzzle = Object.assign({}, creatorLastGeneratedPuzzle);
        } else {
          customPuzzle = solveCustomGrid(creatorN, creatorCells, activeLetters);
        }
        if (!customPuzzle) {
          playError();
          showToast('gentle', '🦉', 'Yollar Birbirini Kapatıyor',
            'Yerleştirdiğin bazı harfler veya engeller diğer harflerin geçiş yolunu tamamen kapatmış! Harfleri 1 kare kaydırabilir veya "✨ Otomatik Taslak" butonuna basabilirsin.');
          return;
        }
        closeCreatorModal();
        applyPuzzle(customPuzzle);
        noteEl.className = 'note teach';
        noteEl.textContent = `🎨 Kendi Tasarladığın Bulmaca (${creatorN}×${creatorN}) Yüklendi! Şimdi kendi ürettiğin bulmacayı çözebilirsin.`;
      });
    }

    if (creatorShare) {
      creatorShare.addEventListener('click', async () => {
        const activeLetters = ['A', 'B', 'C', 'D', 'E'].filter(l => Object.values(creatorCells).filter(v => v === l).length === 2);
        if (activeLetters.length < 2) {
          playError();
          showToast('gentle', '🎨', 'Önce Tasarımını Tamamla', 'Arkadaşına göndermek için en az 2 harf çiftini ızgaraya yerleştir.');
          return;
        }
        playClick();
        let customPuzzle = null;
        if (creatorLastGeneratedPuzzle && creatorLastGeneratedPuzzle.s === creatorN) {
          customPuzzle = Object.assign({}, creatorLastGeneratedPuzzle);
        } else {
          customPuzzle = solveCustomGrid(creatorN, creatorCells, activeLetters);
        }
        if (!customPuzzle) {
          playError();
          showToast('gentle', '🦉', 'Yollar Birbirini Kapatıyor', 'Bu yerleşimde yollar birbirini kesiyor; göndermeden önce harfleri 1 kare kaydır veya "✨ Otomatik Taslak" seç.');
          return;
        }
        const curProfile = appData.profiles && appData.profiles[appData.activeProfileIdx || 0];
        const senderName = (curProfile && curProfile.name) ? curProfile.name : 'Kaşif';
        const pack = encodeCloudPayload({
          s: customPuzzle.s,
          sol: customPuzzle.sol,
          obs: customPuzzle.obstacles || [],
          by: senderName
        });
        const baseUrl = location.href.indexOf('http') === 0
          ? (location.origin + location.pathname)
          : 'https://hkhk-02.github.io/abc-baglamaca/';
        const shareUrl = `${baseUrl}?custom=${pack}`;
        const shareText = `🧩 ${senderName} senin için özel bir ABC Bağlamaca bulmacası (${creatorN}×${creatorN}) tasarladı! Bakalım çözebilecek misin?\n👉 ${shareUrl}`;

        if (navigator.share) {
          try {
            await navigator.share({ title: 'ABC Bağlamaca · Özel Bulmaca', text: shareText, url: shareUrl });
            return;
          } catch (_) {}
        }
        try {
          await navigator.clipboard.writeText(shareText);
          showToast('gentle', '📤', 'Bulmaca Linki Kopyalandı!', 'Tasarladığın bulmacanın özel linki kopyalandı! Şimdi WhatsApp veya mesajla arkadaşına yapıştırıp gönderebilirsin.');
        } catch (_) {
          prompt('Bu linki kopyalayıp arkadaşına gönder:', shareUrl);
        }
      });
    }

    function onPedagogicalWin(gi, li, elapsedSec) {
      clearTimeout(mascotTwoMinTimer);
      if (mascotBar) mascotBar.classList.remove('show');

      // Süre ve kademe istatistiklerini güncelle
      appData.totalSolveSec = (appData.totalSolveSec || 0) + elapsedSec;
      appData.totalTimedWins = (appData.totalTimedWins || 0) + 1;
      if (!appData.gradeTimeSum) appData.gradeTimeSum = {};
      appData.gradeTimeSum['g' + gi] = (appData.gradeTimeSum['g' + gi] || 0) + elapsedSec;

      // Haftalık Macera Haritası ilerlemesini güncelle (Hafta sonu durağı d6 dahil)
      ensureAdventureWeekSync();
      const dow = new Date().getDay();
      const dayIdx = (dow >= 1 && dow <= 5) ? dow : 6;
      const dayKey = 'd' + dayIdx;
      appData.adventureDays[dayKey] = (appData.adventureDays[dayKey] || 0) + 1;
      const questObj = WEEKLY_ADVENTURE.find(q => q.day === dayIdx);
      if (questObj && appData.adventureDays[dayKey] >= questObj.target) {
        appData.unlockedHats[questObj.rewardHat] = true;
      }

      // ADIM 3 & 4: Haftalık Küresel Lig Puanını (addSolved içinde aynı miktarda artırıldı) Ortak Bulut Tablosuna Gönder
      ensureLeagueWeekSync();
      updateProfileButtonUI();
      saveAppData();
      syncPlayerToCloudLeaderboard(false);
    }

    // --- ADIM 3 & ADIM 4: OTOMATİK HAVALI RUMUZ, CANLI BULUT ORTAK SIRALAMA (CLOUD LEADERBOARD) VE 4 BASAMAKLI LİG PİRAMİDİ ---
    const btnProfile = document.getElementById('btnProfile');
    const profileOverlay = document.getElementById('profileOverlay');
    const profileModal = document.getElementById('profileModal');
    const profileSlotsList = document.getElementById('profileSlotsList');
    const profileNameInput = document.getElementById('profileNameInput');
    const profileClose = document.getElementById('profileClose');
    const profileSave = document.getElementById('profileSave');
    const leaguePyramidEl = document.getElementById('leaguePyramid');
    const leagueGentleBannerEl = document.getElementById('leagueGentleBanner');
    const leaderboardListEl = document.getElementById('leaderboardList');
    const btnRefreshCloudLb = document.getElementById('btnRefreshCloudLb');
    const cloudSyncStatusNote = document.getElementById('cloudSyncStatusNote');

    // Ortak Bulut Puan Tablosu Yapılandırması (Tüm gerçek oyuncuları ve arkadaşları aynı listede buluşturur)
    const CLOUD_KV_APP_KEY = 'yrh5yet9';
    const CLOUD_KV_BASE = 'https://keyvalue.immanuel.co/api/KeyVal';

    function ensureDeviceUid() {
      if (!appData.deviceUid) {
        appData.deviceUid = 'u_' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
        saveAppData();
      }
      return appData.deviceUid;
    }

    function getCurrentPlayerCloudId() {
      const uid = ensureDeviceUid();
      const slot = appData.activeProfileIdx || 0;
      return `${uid}_p${slot}`;
    }

    function encodeCloudPayload(obj) {
      try {
        const json = JSON.stringify(obj);
        const b64 = btoa(unescape(encodeURIComponent(json)));
        return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      } catch (_) {
        return '';
      }
    }

    function decodeCloudPayload(str) {
      try {
        if (!str || typeof str !== 'string') return null;
        let b64 = str.replace(/^"+|"+$/g, '').replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) b64 += '=';
        const json = decodeURIComponent(escape(atob(b64)));
        return JSON.parse(json);
      } catch (_) {
        return null;
      }
    }

    async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
      if (typeof AbortController === 'undefined') {
        return fetch(url, options);
      }
      const ctrl = new AbortController();
      const timer = setTimeout(() => { try { ctrl.abort(); } catch (_) {} }, timeoutMs);
      try {
        return await fetch(url, Object.assign({}, options, { signal: ctrl.signal }));
      } finally {
        clearTimeout(timer);
      }
    }

    async function syncPlayerToCloudLeaderboard(renderAfter = false) {
      if (!appData.parentCloudConsent) {
        if (cloudSyncStatusNote) {
          cloudSyncStatusNote.textContent = '🔒 Çocuk güvenliği için bulut sıralaması kapalı (Yalnızca cihaz içi kayıt).';
        }
        return;
      }
      if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        if (cloudSyncStatusNote && renderAfter) {
          cloudSyncStatusNote.textContent = 'ℹ️ Yerel modda bulut senkronizasyonu devre dışı.';
        }
        return;
      }
      try {
        ensureLeagueWeekSync();
        ensureProfilesInit();
        const wkKey = 'abc_lb_' + (appData.leagueWeek || '2026-W45').replace(/[^a-zA-Z0-9_]/g, '_');
        if (cloudSyncStatusNote && renderAfter) {
          cloudSyncStatusNote.textContent = '🔄 Ortak bulut sıralaması güncelleniyor...';
        }

        // 1. Buluttaki mevcut haftalık oyuncu listesini çek
        const getRes = await fetchWithTimeout(`${CLOUD_KV_BASE}/GetValue/${CLOUD_KV_APP_KEY}/${wkKey}`, { cache: 'no-store' }, 6000);
        let cloudObj = null;
        if (getRes.ok) {
          const rawText = await getRes.text();
          cloudObj = decodeCloudPayload(rawText);
        }
        if (!cloudObj || typeof cloudObj !== 'object' || !cloudObj.p) {
          cloudObj = { w: appData.leagueWeek, p: {} };
        }

        // 2. Aktif oyuncunun (ve bu cihazdaki diğer profillerin) güncel ismini ve puanını ekle/güncelle
        const activeIdx = appData.activeProfileIdx || 0;
        const curProfile = appData.profiles[activeIdx];
        const myCloudId = getCurrentPlayerCloudId();
        const myScore = Math.max(0, Number(appData.weeklyLeagueScore) || 0);

        if (curProfile && curProfile.name) {
          const prevEntry = cloudObj.p[myCloudId] || {};
          const incomingClaps = Number(prevEntry.c) || 0;
          const lastSeenClaps = Number(appData.lastSeenClapCount) || 0;
          if (incomingClaps > lastSeenClaps && prevEntry.cb) {
            appData.lastSeenClapCount = incomingClaps;
            setTimeout(() => {
              playSuccess();
              showToast('gentle', '👏', 'Süper! Arkadaşın Seni Alkışladı!',
                `🎉 ${prevEntry.cb} senin haftalık ligdeki başarını alkışladı! (Toplam ${incomingClaps} 👏 Alkış)`);
            }, 900);
          }
          cloudObj.p[myCloudId] = {
            n: curProfile.name.slice(0, 20),
            s: myScore,
            t: Date.now(),
            c: incomingClaps,
            cb: prevEntry.cb || ''
          };
        }

        // Boyut sınırı aşılmasın diye en yüksek puanlı ilk 65 gerçek oyuncuyu tut
        const sortedIds = Object.keys(cloudObj.p).sort((a, b) => (cloudObj.p[b].s || 0) - (cloudObj.p[a].s || 0));
        if (sortedIds.length > 65) {
          sortedIds.slice(65).forEach(oldId => { delete cloudObj.p[oldId]; });
        }

        // Yerel önbelleğe kaydet
        appData.cloudPlayersCache = cloudObj.p;
        saveAppData();

        // 3. Güncellenmiş tabloyu buluta geri yaz
        const encoded = encodeCloudPayload(cloudObj);
        if (encoded) {
          await fetchWithTimeout(`${CLOUD_KV_BASE}/UpdateValue/${CLOUD_KV_APP_KEY}/${wkKey}/${encoded}`, { method: 'POST' }, 6000);
        }

        const realCount = Object.keys(cloudObj.p).length;
        if (cloudSyncStatusNote) {
          cloudSyncStatusNote.innerHTML = `🟢 <strong>Canlı Ortak Sıralama Aktif:</strong> Şu an bu haftaki ortak tabloda <strong>${realCount} gerçek oyuncu (arkadaşın)</strong> yarışıyor!`;
        }
        updateProfileButtonUI();
        if (renderAfter && profileModal && profileModal.classList.contains('show')) {
          renderProfileModal(false);
        }
      } catch (_) {
        if (cloudSyncStatusNote) {
          cloudSyncStatusNote.textContent = '🌐 Çevrimdışı görünüm (İnternet bağlandığında arkadaşlarının puanları otomatik güncellenir).';
        }
      }
    }

    const COOL_NICK_ADJECTIVES = ['Zeki', 'Çevik', 'Cesur', 'Bilge', 'Parlak', 'Atom', 'Yıldız', 'Süper', 'Usta', 'Kutup'];
    const COOL_NICK_NOUNS = ['Kaşif', 'Kaptan', 'Mucit', 'Gezgin', 'Şampiyon', 'Analist', 'Pilot', 'Dehası'];

    function generateCoolNickname(slotIdx) {
      const randNum = 10 + Math.floor(Math.random() * 89);
      const adj = COOL_NICK_ADJECTIVES[(slotIdx * 3 + randNum) % COOL_NICK_ADJECTIVES.length];
      const noun = COOL_NICK_NOUNS[(slotIdx + randNum) % COOL_NICK_NOUNS.length];
      return `${adj} ${noun} #${randNum}`;
    }

    const LEAGUE_TIERS = [
      { id: 'gold', icon: '🏆', name: 'Altın Lig', sub: 'İlk 1–10 · Elit Çözücüler', minRank: 1, maxRank: 10, color: '#f9a825' },
      { id: 'silver', icon: '🥈', name: 'Gümüş Lig', sub: '11–25 · Uzman Çözücüler', minRank: 11, maxRank: 25, color: '#78909c' },
      { id: 'bronze', icon: '🥉', name: 'Bronz Lig', sub: '26–50 · Deneyimli Kaşifler', minRank: 26, maxRank: 50, color: '#bf360c' },
      { id: 'copper', icon: '🛡️', name: 'Bakır / Çırak Lig', sub: '51+ · Yeni Başlayan Kaşifler', minRank: 51, maxRank: 999, color: '#6d4c41' }
    ];

    function getLeagueTierByRank(rank) {
      if (rank <= 10) return LEAGUE_TIERS[0];
      if (rank <= 25) return LEAGUE_TIERS[1];
      if (rank <= 50) return LEAGUE_TIERS[2];
      return LEAGUE_TIERS[3];
    }

    function ensureLeagueWeekSync() {
      const wk = currentIsoWeekKey();
      // İlk geçişte mevcut haftanın puanını Akıl Puanı ile birebir eşitle (aynı formülle devam etsin)
      if (!appData.weeklyFormulaUnifiedV13) {
        appData.weeklyLeagueScore = Math.max(0, Number(appData.score) || 0);
        appData.weeklyFormulaUnifiedV13 = true;
      }
      if (typeof appData.weeklyLeagueScore !== 'number') {
        appData.weeklyLeagueScore = Math.max(0, Number(appData.score) || 0);
      }
      if (appData.leagueWeek && appData.leagueWeek !== wk) {
        // Haftalık sıfırlanma (Seçenek 2): Sadece Haftalık Lig Puanı 0 olur, Toplam Akıl Puanı (appData.score) korunur!
        appData.lastWeekLeagueNote = `🌱 Yeni hafta, yepyeni bir başlangıç! Bu haftanın lig yarışı 0'dan başladı (Toplam Akıl Puanın olan ${appData.score || 0} puan üstte korunuyor!).`;
        appData.weeklyLeagueScore = 0;
        appData.cloudPlayersCache = {};
        if (Array.isArray(appData.profiles)) {
          appData.profiles.forEach(p => {
            if (p && p.snap) p.snap.weeklyLeagueScore = 0;
          });
        }
      }
      appData.leagueWeek = wk;
    }

    function buildGlobalLeaderboardEntries() {
      ensureLeagueWeekSync();
      ensureProfilesInit();
      const activeProfile = appData.profiles[appData.activeProfileIdx || 0];
      const myName = activeProfile ? activeProfile.name : 'Zeki Kaşif #42';
      const myWeeklyScore = Math.max(0, Number(appData.weeklyLeagueScore) || 0);
      const myCloudId = getCurrentPlayerCloudId();

      const peers = [];
      const seenNames = new Set();

      // 1. Önce buluttaki tüm GERÇEK oyuncuları (arkadaşlarımızı) ekle
      const cloudMap = appData.cloudPlayersCache || {};
      Object.keys(cloudMap).forEach(cid => {
        if (cid === myCloudId) return; // Kendimizi aşağıda 'isMe: true' olarak ekleyeceğiz
        const item = cloudMap[cid];
        if (!item || !item.n) return;
        const cleanN = String(item.n).trim();
        const normKey = cleanN.toLowerCase();
        if (normKey === myName.trim().toLowerCase()) return;
        if (seenNames.has(normKey)) return;
        seenNames.add(normKey);
        peers.push({
          cloudId: cid,
          name: `🟢 ${cleanN}`,
          rawName: cleanN,
          score: Math.max(0, Number(item.s) || 0),
          claps: Number(item.c) || 0,
          isMe: false,
          isRealFriend: true
        });
      });

      // 2. Kendimizi ekle
      const myCloudEntry = (cloudMap && cloudMap[myCloudId]) || {};
      peers.push({
        cloudId: myCloudId,
        name: `🌟 ${myName} (Sen)`,
        rawName: myName,
        score: myWeeklyScore,
        claps: Number(myCloudEntry.c) || 0,
        isMe: true,
        isRealFriend: true
      });

      // 3. Toplam 55 kişilik 4 lig basamağını tamamlamak için kalan boşlukları sistem kaşifleriyle doldur
      const wkSeedStr = appData.leagueWeek || '2026-W45';
      let hash = 2166136261;
      for (let i = 0; i < wkSeedStr.length; i++) {
        hash ^= wkSeedStr.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      const rng = mulberry32(hash >>> 0);
      const flags = ['🇹🇷', '🇯🇵', '🇩🇪', '🇰🇷', '🇬🇧', '🇫🇷', '🇨🇦', '🇧🇷', '🇳🇱', '🇪🇸', '🇮🇹', '🇦🇿'];
      const neededBots = Math.max(10, 56 - peers.length);
      for (let i = 0; i < neededBots; i++) {
        const adj = COOL_NICK_ADJECTIVES[Math.floor(rng() * COOL_NICK_ADJECTIVES.length)];
        const noun = COOL_NICK_NOUNS[Math.floor(rng() * COOL_NICK_NOUNS.length)];
        const num = 10 + Math.floor(rng() * 89);
        const flag = flags[Math.floor(rng() * flags.length)];
        const baseScore = Math.round(45 + Math.pow(rng(), 1.65) * 1280);
        peers.push({
          name: `${flag} ${adj} ${noun} #${num}`,
          score: baseScore,
          isMe: false,
          isRealFriend: false
        });
      }

      peers.sort((a, b) => b.score - a.score || (a.isMe ? -1 : 1));
      peers.forEach((p, idx) => { p.rank = idx + 1; });
      return peers;
    }

    const DEFAULT_PROFILES = [
      { id: 0, name: '', icon: '🧒' },
      { id: 1, name: '', icon: '👧' },
      { id: 2, name: '', icon: '🧑' },
      { id: 3, name: '', icon: '🌟' }
    ];

    function ensureProfilesInit() {
      if (!Array.isArray(appData.profiles) || appData.profiles.length !== 4) {
        appData.profiles = DEFAULT_PROFILES.map((p, idx) => ({
          id: idx,
          name: generateCoolNickname(idx),
          icon: p.icon,
          snap: idx === 0 ? {
            progress: appData.progress || {},
            tourProgress: appData.tourProgress || {},
            unlockedIdx: appData.unlockedIdx || 0,
            goldTour: appData.goldTour || 0,
            goldCrowns: appData.goldCrowns || {},
            score: appData.score || 0,
            weeklyLeagueScore: appData.score || 0,
            achievements: appData.achievements || {},
            equippedHat: appData.equippedHat || '',
            unlockedHats: appData.unlockedHats || {},
            adventureDays: appData.adventureDays || {}
          } : {
            progress: {}, tourProgress: {}, unlockedIdx: 0,
            goldTour: 0, goldCrowns: {}, score: 0, weeklyLeagueScore: 0,
            achievements: {}, equippedHat: '', unlockedHats: {}, adventureDays: {}
          }
        }));
        appData.activeProfileIdx = 0;
        saveAppData();
      } else {
        // Eski 'Kaşif 1' gibi jenerik isimleri otomatik havalı rumuza yükselt
        appData.profiles.forEach((p, idx) => {
          if (!p.name || /^Kaşif\s*\d+$/i.test(p.name.trim())) {
            p.name = generateCoolNickname(idx);
          }
        });
      }
    }
    ensureProfilesInit();
    ensureLeagueWeekSync();

    function syncCurrentToActiveProfile() {
      ensureProfilesInit();
      const idx = appData.activeProfileIdx || 0;
      if (!appData.profiles[idx]) return;
      appData.profiles[idx].snap = {
        progress: JSON.parse(JSON.stringify(appData.progress || {})),
        tourProgress: JSON.parse(JSON.stringify(appData.tourProgress || {})),
        unlockedIdx: appData.unlockedIdx || 0,
        goldTour: appData.goldTour || 0,
        goldCrowns: JSON.parse(JSON.stringify(appData.goldCrowns || {})),
        score: appData.score || 0,
        weeklyLeagueScore: appData.weeklyLeagueScore || 0,
        achievements: JSON.parse(JSON.stringify(appData.achievements || {})),
        equippedHat: appData.equippedHat || '',
        unlockedHats: JSON.parse(JSON.stringify(appData.unlockedHats || {})),
        adventureDays: JSON.parse(JSON.stringify(appData.adventureDays || {}))
      };
    }

    function updateProfileButtonUI() {
      ensureProfilesInit();
      const entries = buildGlobalLeaderboardEntries();
      const me = entries.find(e => e.isMe) || { rank: 52 };
      const tier = getLeagueTierByRank(me.rank);
      const cur = appData.profiles[appData.activeProfileIdx || 0];
      if (btnProfile && cur) {
        btnProfile.textContent = `${tier.icon} ${cur.name}`;
      }
      if (statBadge) {
        statBadge.textContent = `${tier.icon} ${tier.name.split(' ')[0]} (#${me.rank})`;
      }
    }
    updateProfileButtonUI();

    async function sendClapToFriend(targetCloudId, targetRawName) {
      try {
        playPathComplete();
        const wkKey = 'abc_lb_' + (appData.leagueWeek || '2026-W45').replace(/[^a-zA-Z0-9_]/g, '_');
        const getRes = await fetch(`${CLOUD_KV_BASE}/GetValue/${CLOUD_KV_APP_KEY}/${wkKey}`, { cache: 'no-store' });
        let cloudObj = null;
        if (getRes.ok) {
          cloudObj = decodeCloudPayload(await getRes.text());
        }
        if (!cloudObj || !cloudObj.p || !cloudObj.p[targetCloudId]) return;
        const curProfile = appData.profiles[appData.activeProfileIdx || 0];
        const myName = (curProfile && curProfile.name) ? curProfile.name : 'Kaşif';
        cloudObj.p[targetCloudId].c = (Number(cloudObj.p[targetCloudId].c) || 0) + 1;
        cloudObj.p[targetCloudId].cb = myName;
        appData.cloudPlayersCache = cloudObj.p;
        saveAppData();
        const encoded = encodeCloudPayload(cloudObj);
        if (encoded) {
          await fetch(`${CLOUD_KV_BASE}/UpdateValue/${CLOUD_KV_APP_KEY}/${wkKey}/${encoded}`, { method: 'POST' });
        }
        renderProfileModal(false);
        showToast('gentle', '👏', 'Alkış Gönderildi!', `${targetRawName} adlı arkadaşına tebrik alkışı gönderdin!`);
      } catch (_) {}
    }

    function switchProfileSlot(newIdx) {
      ensureProfilesInit();
      syncCurrentToActiveProfile();
      appData.activeProfileIdx = newIdx;
      const target = appData.profiles[newIdx];
      const snap = target.snap || {};
      appData.progress = snap.progress || {};
      appData.tourProgress = snap.tourProgress || {};
      appData.unlockedIdx = snap.unlockedIdx || 0;
      appData.goldTour = snap.goldTour || 0;
      appData.goldCrowns = snap.goldCrowns || {};
      appData.score = snap.score || 0;
      appData.weeklyLeagueScore = typeof snap.weeklyLeagueScore === 'number' ? snap.weeklyLeagueScore : (snap.score || 0);
      appData.achievements = snap.achievements || {};
      appData.equippedHat = snap.equippedHat || '';
      appData.unlockedHats = snap.unlockedHats || {};
      appData.adventureDays = snap.adventureDays || {};
      streakCount = 0;
      const uIdx = Math.min(29, Math.max(0, appData.unlockedIdx || 0));
      gradeIdx = Math.floor(uIdx / 5);
      levelIdx = uIdx % 5;
      saveAppData();
      applyEquippedHat();
      updateProfileButtonUI();
      updateStatsUI();
      updateGoldTourBanner();
      buildGradeButtons();
      buildLevelButtons();
      newPuzzle();
    }

    const GRADE_CERTIFICATES = [
      { gi: 0, icon: '🌱', title: 'Minik Kaşif Tebrik Kartı', gradeName: 'Çok Kolay', desc: 'Çok Kolay kademesindeki tüm 5 seviyeyi başarıyla tamamlayarak temel uzamsal bağlama aşamasını bitirdi.' },
      { gi: 1, icon: '⭐', title: 'Yıldız Çözücü Tebrik Kartı', gradeName: 'Kolay', desc: 'Kolay kademesindeki tüm 5 seviyeyi tamamlayarak rota planlama ve eşleştirme aşamasını bitirdi.' },
      { gi: 2, icon: '🧩', title: 'Mantık Ustası Tebrik Kartı', gradeName: 'Orta', desc: 'Orta kademesindeki tüm 5 seviyeyi tamamlayarak çok adımlı mantık yürütme aşamasını bitirdi.' },
      { gi: 3, icon: '🚀', title: 'İleri Strateji Tebrik Kartı', gradeName: 'İyi', desc: 'İyi kademesindeki tüm 5 seviyeyi tamamlayarak ileri düzey stratejik düşünme aşamasını bitirdi.' },
      { gi: 4, icon: '🔥', title: 'Üstün Zeka Tebrik Kartı', gradeName: 'Zor', desc: 'Zor kademesindeki tüm 5 seviyeyi tamamlayarak karmaşık ızgaralarda problem çözme aşamasını bitirdi.' },
      { gi: 5, icon: '👑', title: 'Büyük Zeka Ustası Başarı Kartı', gradeName: 'Uzman (Tüm Oyun)', desc: 'ABC Bağlamaca oyunundaki tüm 30 seviyeyi ve Uzman kademesini tamamlayarak oyun içi Büyük Usta unvanına ulaştı!' }
    ];

    function isGradeCertificateUnlocked(gi) {
      if ((appData.goldTour || 0) > 0) return true;
      const uIdx = appData.unlockedIdx || 0;
      if (gi < 5 && uIdx >= (gi + 1) * 5) return true;
      const req = requiredForLevel(gi);
      return GRADES[gi].levels.every((_, li) => solvedCount(gi, li) >= req);
    }

    let selectedCertGi = null;

    function renderProfilePortfolio() {
      const summaryEl = document.getElementById('profilePortfolioSummary');
      const titleEl = document.getElementById('myAchievementsTitle');
      const diplomaEl = document.getElementById('certDiplomaView');
      const certsGridEl = document.getElementById('profileCertsGrid');
      const trophiesRowEl = document.getElementById('profileTrophiesRow');
      if (!certsGridEl) return;

      const activeIdx = appData.activeProfileIdx || 0;
      const curProfile = (appData.profiles && appData.profiles[activeIdx]) || { name: 'Kaşif' };
      const studentName = curProfile.name || 'Kaşif';
      const totalScore = Math.max(0, Number(appData.score) || 0);
      const totalSolved = Object.values(appData.progress || {}).reduce((a, b) => a + b, 0);
      const unlockedLevels = (appData.goldTour || 0) > 0 ? 30 : Math.min(30, (appData.unlockedIdx || 0) + 1);
      const crownsCount = countGoldCrowns();
      const unlockedBadges = Object.keys(appData.achievements || {}).length;
      const unlockedCerts = GRADE_CERTIFICATES.filter(c => isGradeCertificateUnlocked(c.gi));

      if (titleEl) {
        titleEl.textContent = `🏅 Başarılarım ve Tebrik Kartlarım (${unlockedCerts.length}/6 Kart · ${unlockedBadges}/8 Kupa)`;
      }
      if (summaryEl) {
        summaryEl.innerHTML = `🎖️ <strong>Tebrik Kartı:</strong> ${unlockedCerts.length}/6 &nbsp;·&nbsp; 🔓 <strong>Seviye:</strong> ${unlockedLevels}/30 &nbsp;·&nbsp; 👑 <strong>Taç:</strong> ${crownsCount}/30 &nbsp;·&nbsp; 🏆 <strong>Kupa:</strong> ${unlockedBadges}/${ACHIEVEMENTS.length}`;
      }

      if (selectedCertGi === null && unlockedCerts.length > 0) {
        selectedCertGi = unlockedCerts[unlockedCerts.length - 1].gi;
      }

      if (diplomaEl) {
        const activeCert = GRADE_CERTIFICATES.find(c => c.gi === selectedCertGi && isGradeCertificateUnlocked(c.gi));
        if (activeCert) {
          diplomaEl.classList.add('show');
          diplomaEl.innerHTML = `
            <div class="d-seal">🦉 MİNİBİLGE KULÜBÜ · OYUN İÇİ BAŞARI VE TEBRİK KARTI</div>
            <div class="d-icon">${activeCert.icon}</div>
            <div class="d-title">${activeCert.title}</div>
            <div class="d-student">🌟 ${studentName}</div>
            <div class="d-desc">${activeCert.desc}</div>
            <div style="font-size:0.68rem;font-weight:800;color:#00695c;margin-bottom:4px;">
              🧠 Toplam Akıl Puanı: ${totalScore} · 🧩 Çözülen: ${totalSolved} · 👑 Altın Taç: ${crownsCount}/30
            </div>
            <div style="font-size:0.6rem;color:#607d8b;font-style:italic;">
              * Bu kart, oyun içi aşamaları tamamlayan öğrencileri teşvik etmek amacıyla profilde sergilenen oyun içi motivasyon hatırasıdır.
            </div>
          `;
        } else {
          diplomaEl.classList.remove('show');
          diplomaEl.innerHTML = '';
        }
      }

      certsGridEl.innerHTML = GRADE_CERTIFICATES.map(c => {
        const unlocked = isGradeCertificateUnlocked(c.gi);
        const solvedInG = gradeSolved(c.gi);
        const reqTotal = requiredForLevel(c.gi) * 5;
        return `<div class="cert-card ${unlocked ? 'unlocked' : ''}" data-cgi="${c.gi}">
          <div class="c-head"><span>${c.icon}</span><span>${c.title}</span></div>
          <div class="c-sub">${c.gradeName} Kademesi (${unlocked ? '5/5 Seviye Tamamlandı' : `İlerleme: ${Math.min(reqTotal, solvedInG)}/${reqTotal} çözüm`})</div>
          <span class="c-badge">${unlocked ? '✓ Kazanıldı · 🎖️ Kartı Gör' : '🔒 Kademeyi Bitirince Açılır'}</span>
        </div>`;
      }).join('');

      certsGridEl.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
          const cgi = parseInt(card.getAttribute('data-cgi'), 10);
          if (!isGradeCertificateUnlocked(cgi)) {
            playError();
            showToast('gentle', '🎖️', 'Tebrik Kartı Henüz Kilitli',
              `Bu oyun içi tebrik kartını açmak için "${GRADES[cgi].label}" zorluğundaki 5 seviyeyi tamamla!`);
            return;
          }
          playClick();
          selectedCertGi = cgi;
          renderProfilePortfolio();
        });
      });

      if (trophiesRowEl) {
        const earnedBadgesList = ACHIEVEMENTS.filter(a => appData.achievements && appData.achievements[a.id])
          .map(a => `<span style="display:inline-block;background:#fff;border:1px solid #cfd8dc;border-radius:99px;padding:2px 7px;margin:2px;font-weight:800;color:#263238;">${a.icon} ${a.title}</span>`)
          .join('');
        const earnedHatsList = WEEKLY_ADVENTURE.filter(q => isHatUnlocked(q))
          .map(q => `<span style="display:inline-block;background:#f3e5f5;border:1px solid #ce93d8;border-radius:99px;padding:2px 7px;margin:2px;font-weight:800;color:#4a148c;">${q.rewardHat} ${q.rewardTitle}</span>`)
          .join('');
        trophiesRowEl.innerHTML =
          `<div style="margin-bottom:4px;"><strong>🏆 Kazanılan Kupalar (${unlockedBadges}/${ACHIEVEMENTS.length}):</strong> ${earnedBadgesList || '<span style="opacity:0.75;">Henüz kupa kazanılmadı, bulmaca çözdükçe otomatik eklenir!</span>'}</div>` +
          `<div><strong>🎩 Kazanılan Şapkalar:</strong> ${earnedHatsList || '<span style="opacity:0.75;">Günlük macera görevlerini tamamladıkça buraya eklenir!</span>'}</div>`;
      }
    }

    function renderProfileModal(triggerCloudSync = true) {
      ensureProfilesInit();
      syncCurrentToActiveProfile();
      if (triggerCloudSync) {
        syncPlayerToCloudLeaderboard(true);
      }
      const activeIdx = appData.activeProfileIdx || 0;
      if (profileNameInput) {
        profileNameInput.value = appData.profiles[activeIdx].name;
      }

      const entries = buildGlobalLeaderboardEntries();
      const me = entries.find(e => e.isMe) || { rank: 52, score: 60 };
      const myTier = getLeagueTierByRank(me.rank);

      if (leaguePyramidEl) {
        leaguePyramidEl.innerHTML = LEAGUE_TIERS.map(t => {
          const isAct = t.id === myTier.id;
          return `<div class="league-tier-card ${isAct ? 'active-tier' : ''}" style="${isAct ? `border-color:${t.color};` : ''}">
            <span class="lt-ic">${t.icon}</span>
            <span class="lt-name" style="color:${t.color}">${t.name}</span>
            <span class="lt-range">${t.sub}</span>
          </div>`;
        }).join('');
      }

      if (leagueGentleBannerEl) {
        let gentleMsg = '';
        if (me.rank <= 10) {
          gentleMsg = `🌟 Harikasın! Haftalık sıralamada <strong>#${me.rank}.</strong> sıradaki <strong>🏆 Altın Lig (Elit Çözücüler)</strong> zirvesindesin!`;
        } else if (me.rank <= 25) {
          const needPts = Math.max(10, entries[9].score - me.score + 5);
          gentleMsg = `🥈 <strong>Gümüş Lig (#${me.rank}. Sıra):</strong> Çok iyi gidiyorsun! Altın Lig zirvesine yükselmek için sadece <strong>+${needPts} puan</strong> kaldı!`;
        } else if (me.rank <= 50) {
          const needPts = Math.max(10, entries[24].score - me.score + 5);
          gentleMsg = `🥉 <strong>Bronz Lig (#${me.rank}. Sıra):</strong> Beyin kasların güçleniyor! Gümüş Lig'e adım atmak için <strong>+${needPts} puan</strong> yeterli!`;
        } else {
          const needPts = Math.max(10, entries[49].score - me.score + 5);
          gentleMsg = `🛡️ <strong>Bakır / Çırak Lig (#${me.rank}. Sıra):</strong> Hadi bu hafta üst lige tırmanmak için harika bir şans! Bronz Lig için <strong>+${needPts} puan</strong> topla!`;
        }
        if (appData.lastWeekLeagueNote) {
          gentleMsg = `${appData.lastWeekLeagueNote}<br>${gentleMsg}`;
        }
        const totalMindScore = Math.max(0, Number(appData.score) || 0);
        gentleMsg += `<div style="margin-top:5px;font-size:0.74rem;color:#1b5e20;opacity:0.92;">📅 <strong>Bu Haftaki Lig Puanın:</strong> ${me.score} Puan &nbsp;·&nbsp; 🧠 <strong>Toplam Akıl Puanın:</strong> ${totalMindScore} Puan</div>`;
        leagueGentleBannerEl.innerHTML = gentleMsg;
      }

      if (leaderboardListEl) {
        const totalMindScore = Math.max(0, Number(appData.score) || 0);
        leaderboardListEl.innerHTML = entries.map(e => {
          const tier = getLeagueTierByRank(e.rank);
          const clapBadge = e.claps ? ` <span style="font-size:0.68rem;color:#e65100;">(👏 ${e.claps})</span>` : '';
          const totalSub = (e.isMe && totalMindScore > e.score)
            ? ` <span style="font-size:0.68rem;color:#546e7a;font-weight:700;">(Toplam: ${totalMindScore})</span>`
            : '';
          const clapBtn = (e.isRealFriend && !e.isMe && e.cloudId)
            ? `<button type="button" class="pal-btn btn-clap-friend" data-cid="${e.cloudId}" data-cname="${e.rawName || ''}" style="padding:2px 7px;font-size:0.68rem;margin-left:6px;background:#fff8e1;border-color:#fbc02d;color:#e65100;" title="Arkadaşını Alkışla!">👏 Alkışla</button>`
            : '';
          return `<div class="lb-row ${e.isMe ? 'is-me' : ''}" ${e.isMe ? 'id="lbMyRow"' : ''}>
            <span class="lb-rank">#${e.rank} ${tier.icon}</span>
            <span class="lb-player">${e.name}${clapBadge}${totalSub}</span>
            <span class="lb-score">${e.score} Puan${clapBtn}</span>
          </div>`;
        }).join('');
        leaderboardListEl.querySelectorAll('.btn-clap-friend').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            sendClapToFriend(btn.getAttribute('data-cid'), btn.getAttribute('data-cname'));
          });
        });
        setTimeout(() => {
          const myRow = document.getElementById('lbMyRow');
          if (myRow && leaderboardListEl) {
            myRow.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }, 60);
      }

      if (profileSlotsList) {
        profileSlotsList.innerHTML = appData.profiles.map((p, idx) => {
          const isAct = idx === activeIdx;
          const pScore = (p.snap && p.snap.score) || 0;
          const pSolved = Object.values((p.snap && p.snap.progress) || {}).reduce((a, b) => a + b, 0);
          return `<button type="button" class="pal-btn ${isAct ? 'active' : ''}" data-pidx="${idx}" style="display:flex;flex-direction:column;align-items:flex-start;padding:8px 10px;text-align:left;">
            <span style="font-size:0.82rem;font-weight:900;">${p.icon} ${p.name} ${isAct ? '✓' : ''}</span>
            <span style="font-size:0.68rem;opacity:0.85;">Çözüm: ${pSolved} · Puan: ${pScore}</span>
          </button>`;
        }).join('');

        profileSlotsList.querySelectorAll('button[data-pidx]').forEach(btn => {
          btn.addEventListener('click', () => {
            playClick();
            const chosenIdx = parseInt(btn.getAttribute('data-pidx'), 10);
            if (chosenIdx !== (appData.activeProfileIdx || 0)) {
              switchProfileSlot(chosenIdx);
            }
            renderProfileModal();
          });
        });
      }

      renderProfilePortfolio();
    }

    function openProfileModal() {
      renderProfileModal();
      profileOverlay.classList.add('show');
      profileModal.classList.add('show');
    }
    function closeProfileModal() {
      profileOverlay.classList.remove('show');
      profileModal.classList.remove('show');
    }
    const parentGateOverlay = document.getElementById('parentGateOverlay');
    const parentGateModal = document.getElementById('parentGateModal');
    const parentGateQuestion = document.getElementById('parentGateQuestion');
    const parentGateInput = document.getElementById('parentGateInput');
    const parentGateError = document.getElementById('parentGateError');
    const parentGateCancel = document.getElementById('parentGateCancel');
    const parentGateConfirm = document.getElementById('parentGateConfirm');
    let parentGateAnswer = 0;
    let parentGateCallback = null;
    let parentGateUnlockedUntil = 0;

    function closeParentGate() {
      if (parentGateOverlay) parentGateOverlay.classList.remove('show');
      if (parentGateModal) parentGateModal.classList.remove('show');
      parentGateCallback = null;
    }

    function requireParentGate(onSuccess) {
      if (Date.now() < parentGateUnlockedUntil) {
        if (typeof onSuccess === 'function') onSuccess();
        return;
      }
      const a = 6 + Math.floor(Math.random() * 4); // 6..9
      const b = 7 + Math.floor(Math.random() * 3); // 7..9
      parentGateAnswer = a * b;
      parentGateCallback = onSuccess;
      if (parentGateQuestion) parentGateQuestion.textContent = `${a} × ${b} = ?`;
      if (parentGateInput) parentGateInput.value = '';
      if (parentGateError) {
        parentGateError.style.display = 'none';
        parentGateError.textContent = '';
      }
      if (parentGateOverlay) parentGateOverlay.classList.add('show');
      if (parentGateModal) parentGateModal.classList.add('show');
      setTimeout(() => { if (parentGateInput) parentGateInput.focus(); }, 60);
    }

    function submitParentGate() {
      const val = parseInt((parentGateInput ? parentGateInput.value : '').trim(), 10);
      if (val === parentGateAnswer) {
        playClick();
        parentGateUnlockedUntil = Date.now() + 5 * 60 * 1000;
        const cb = parentGateCallback;
        closeParentGate();
        if (typeof cb === 'function') cb();
      } else {
        playError();
        if (parentGateError) {
          parentGateError.textContent = 'Yanlış cevap, lütfen tekrar deneyin.';
          parentGateError.style.display = 'block';
        }
      }
    }

    if (parentGateConfirm) parentGateConfirm.addEventListener('click', submitParentGate);
    if (parentGateCancel) parentGateCancel.addEventListener('click', () => { playClick(); closeParentGate(); });
    if (parentGateOverlay) parentGateOverlay.addEventListener('click', closeParentGate);
    if (parentGateInput) {
      parentGateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); submitParentGate(); }
      });
    }

    const btnPrivacyInfo = document.getElementById('btnPrivacyInfo');
    const privacyOverlay = document.getElementById('privacyOverlay');
    const privacyModal = document.getElementById('privacyModal');
    const privacyClose = document.getElementById('privacyClose');
    function openPrivacyModal() {
      if (privacyOverlay) privacyOverlay.classList.add('show');
      if (privacyModal) privacyModal.classList.add('show');
    }
    function closePrivacyModal() {
      if (privacyOverlay) privacyOverlay.classList.remove('show');
      if (privacyModal) privacyModal.classList.remove('show');
    }
    if (btnPrivacyInfo) btnPrivacyInfo.addEventListener('click', () => { playClick(); openPrivacyModal(); });
    if (privacyClose) privacyClose.addEventListener('click', () => { playClick(); closePrivacyModal(); });
    if (privacyOverlay) privacyOverlay.addEventListener('click', closePrivacyModal);

    if (btnProfile) btnProfile.addEventListener('click', () => { playClick(); openProfileModal(); });
    if (btnRefreshCloudLb) {
      btnRefreshCloudLb.addEventListener('click', () => {
        playClick();
        requireParentGate(() => {
          appData.parentCloudConsent = true;
          saveAppData();
          syncPlayerToCloudLeaderboard(true);
        });
      });
    }
    if (profileClose) profileClose.addEventListener('click', () => { playClick(); closeProfileModal(); });
    if (profileOverlay) profileOverlay.addEventListener('click', closeProfileModal);
    if (profileSave) {
      profileSave.addEventListener('click', () => {
        playClick();
        ensureProfilesInit();
        const activeIdx = appData.activeProfileIdx || 0;
        const cleanName = (profileNameInput.value || '').trim().slice(0, 20);
        if (cleanName) {
          appData.profiles[activeIdx].name = cleanName;
        }
        syncCurrentToActiveProfile();
        saveAppData();
        updateProfileButtonUI();
        syncPlayerToCloudLeaderboard(true);
        renderProfileModal(false);
        closeProfileModal();
      });
    }

    // Açılışta ilk çizim tamamlandıktan sonra mevcut oyuncuyu ve puanını ortak bulut tablosuyla senkronize et
    setTimeout(() => { syncPlayerToCloudLeaderboard(false); }, 2500);

    /* Başlat: Açık olan en son seviyeden başlat */
    if ((appData.goldTour || 0) === 0) {
      const uIdx = Math.min(29, Math.max(0, appData.unlockedIdx || 0));
      gradeIdx = Math.floor(uIdx / 5);
      levelIdx = uIdx % 5;
    }
    updateGoldTourBanner();
    buildGradeButtons();
    buildLevelButtons();
    memoryMode = false;
    if (btnMemory) btnMemory.classList.remove('active');
    newPuzzle();
    updateProfileButtonUI();

    // Eğer arkadaşımız bize özel tasarladığı bulmaca linkini (?custom=...) gönderdiyse otomatik aç!
    try {
      const urlParams = new URLSearchParams(location.search);
      const customParam = urlParams.get('custom');
      if (customParam) {
        const customObj = decodeCloudPayload(customParam);
        if (customObj && customObj.s && Array.isArray(customObj.sol)) {
          applyPuzzle({
            s: customObj.s,
            sol: customObj.sol,
            obstacles: customObj.obs || [],
            score: 180,
            code: 1000
          });
          noteEl.className = 'note teach';
          noteEl.textContent = `🎁 Arkadaşın "${customObj.by || 'Kaşif'}" tarafından senin için tasarlanan özel bulmaca (${customObj.s}×${customObj.s}) yüklendi!`;
        }
      }
    } catch (_) {}
    if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  })();
