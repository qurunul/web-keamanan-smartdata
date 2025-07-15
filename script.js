//Navbar
const toggle = document.querySelector('.toggle');
const navbarLinks = document.querySelector('.navbar-links');
toggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

//Simulasi
function simulasiRisiko() {
    const select = document.getElementById('data-pribadi');
    const hasil = document.getElementById('hasil-simulasi');
    const data = select.value;

    if (!data) {
        hasil.textContent = "Mohon pilih jenis data pribadi untuk melihat risiko.";
        return;
    }

    let output = '';

    switch(data) {
        case 'nik':
        output = "Risiko nyata jika bocor:\n- Pencurian identitas (identity theft).\n- Pendaftaran pinjaman ilegal ilegal atas nama Anda.\n- Penyalahgunaan dalam pembuatan akun palsu (bank, SIM card, e-wallet, dsb).\n- Potensi penyalahgunaan untuk pengalihan hak atau keperluan hukum tanpa sepengetahuan.\n Ciri-Ciri yang Bisa Dikenali:\n- Menerima tagihan pinjaman online yang tidak pernah Anda ajukan.\n- Mendapat notifikasi verifikasi akun dari layanan yang tidak Anda daftarkan.\n- Nama Anda muncul di daftar hutang pinjol di aplikasi pihak ketiga (misalnya: cek BI Checking / SLIK OJK).";
        break;
        case 'nomor_hp':
        output = "Risiko Nyata Jika Bocor:\n- Penipuan melalui telepon atau WhatsApp (modus OTP palsu, undangan link berbahaya).\n- Nomor Anda dijadikan target spam, robo-call, dan iklan tidak diinginkan.\n- Potensi SIM-swap (pencurian nomor SIM untuk ambil alih akun WhatsApp, Telegram, dsb).\n- Digunakan untuk registrasi akun layanan digital secara ilegal.\n Ciri-Ciri yang Bisa Dikenali:\n- Sering menerima panggilan mencurigakan atau SMS dari nomor tak dikenal.\n- Mendapat permintaan OTP dari layanan yang tidak Anda gunakan.\n- Nomor WhatsApp Anda tiba-tiba logout tanpa alasan (indikasi SIM swap).\n- Kontak Anda menerima pesan mencurigakan seolah dari Anda.";
        break;
        case 'email':
        output = "Risiko Nyata Jika Bocor:\n- Serangan phishing (email jebakan) dengan mengaku dari bank, kampus, atau platform belanja.\n- Akses ilegal ke akun media sosial atau platform lain jika password email sama.\n- Masuk ke daftar spam global, menyebabkan inbox dibanjiri iklan / malware.\n- Email dijadikan sarana menyebar hoaks atau pemerasan digital.\n Ciri-Ciri yang Bisa Dikenali:\n- Menerima email dari pengirim asing yang berisi tautan mencurigakan.\n- Tiba-tiba logout dari akun email atau akun lain yang tertaut.\n- Mendapat email percobaan login gagal dari lokasi yang tidak dikenal.\n- Email digunakan untuk reset password layanan lain tanpa seizin Anda.";
        break;
        case 'nama_ibu':
        output = "Risiko Nyata Jika Bocor:\n- Menjawab pertanyaan keamanan akun digital (banyak sistem masih pakai ini!).\n- Dapat digunakan untuk mengakses akun bank melalui call center.\n- Membantu pelaku menyusun serangan social engineering yang lebih meyakinkan (profiling identitas).\n Ciri-Ciri yang Bisa Dikenali:\n- Akun Anda diakses meskipun tidak membagikan password, karena pelaku berhasil menjawab pertanyaan keamanan.\n- Pihak bank atau layanan online menghubungi Anda tentang aktivitas mencurigakan padahal Anda tidak pernah mengajukan.\n- Ada perubahan atau reset akun tanpa permintaan dari Anda.";
        break;
        default:
        output = "Pilih jenis data untuk melihat risiko nyata yang bisa terjadi.";
    }

    hasil.textContent = output;
}

//Kuis
let quizResults = {
    score: 0,
    total: 5,
    vulnerableAreas: []
};

function submitQuiz() {
    const total = 5;
    const answers = {
        q1: "B",
        q2: "C",
        q3: "B",
        q4: "B",
        q5: "C"
    };

    const questionTopics = {
        q1: "NIK",
        q2: "OTP/Phone Security",
        q3: "Email Security",
        q4: "Security Questions",
        q5: "Data Breach Response"
    };

    // Check all required questions answered
    for (let i = 1; i <= total; i++) {
        const checked = document.querySelector(`input[name="q${i}"]:checked`);
        if (!checked) {
            alert(`Mohon jawab pertanyaan nomor ${i} terlebih dahulu.`);
            return;
        }
    }

    // Calculate score and identify vulnerable areas
    let score = 0;
    let vulnerableAreas = [];
    
    for (let i = 1; i <= total; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected.value === answers[`q${i}`]) {
            score++;
        } else {
            vulnerableAreas.push(questionTopics[`q${i}`]);
        }
    }

    // Store results globally
    quizResults = { score, total, vulnerableAreas };

    const resultBox = document.getElementById("result");
    resultBox.style.display = "block";
    
    let securityLevel = "";
    let securityMessage = "";
    let nextStepMessage = "";

    if (score === 5) {
        securityLevel = "🛡️ Sangat Aman";
        securityMessage = "Kamu sangat waspada terhadap keamanan data. Pertahankan!";
        nextStepMessage = "Meski sudah aman, pelajari tips tambahan untuk tetap waspada.";
    } else if (score >= 3) {
        securityLevel = "⚠️ Cukup Aman";
        securityMessage = "Kamu cukup waspada, tapi masih ada yang perlu diperhatikan.";
        nextStepMessage = "Ingin tahu cara mengamankan data yang masih rentan?";
    } else {
        securityLevel = "❌ Sangat Rentan";
        securityMessage = "Wah, kamu harus lebih hati-hati terhadap risiko kebocoran data.";
        nextStepMessage = "Penting! Pelajari cara melindungi data pribadi kamu sekarang.";
    }

    resultBox.innerHTML = `
        <h3>Hasil Kuis:</h3>
        <p>Kamu menjawab <strong>${score} dari ${total}</strong> pertanyaan dengan benar.</p>
        <p><strong>${securityLevel}</strong></p>
        <p>${securityMessage}</p>
        <div class="security-recommendation">
            <p><strong>${nextStepMessage}</strong></p>
            <button type="button" class="tips-button" onclick="goToPersonalizedTips()">
                🔒 Dapatkan Tips Keamanan Personal
            </button>
        </div>
    `;
    
    // Show the Lanjut button after showing result
    document.getElementById('nextBtn').style.display = 'inline-block';
}

function goToPersonalizedTips() {
    // Store quiz results in localStorage for the tips page
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    window.location.href = 'tips.html';
}

// Tips page functionality
function initializeTipsPage() {
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
        const results = JSON.parse(storedResults);
        showPersonalizedAssessment(results);
    }
}

function showPersonalizedAssessment(results) {
    const assessmentContainer = document.getElementById('personalized-assessment');
    if (!assessmentContainer) return;

    let assessmentHTML = `
        <div class="assessment-header">
            <h2>📊 Hasil Analisis Keamanan Personal Kamu</h2>
            <p>Berdasarkan hasil kuis, berikut adalah area yang perlu kamu perhatikan:</p>
        </div>
    `;

    if (results.vulnerableAreas.length > 0) {
        assessmentHTML += `
            <div class="vulnerable-areas">
                <h3>⚠️ Area yang Perlu Diperkuat:</h3>
                <ul>
        `;
        
        results.vulnerableAreas.forEach(area => {
            assessmentHTML += `<li>${area}</li>`;
        });
        
        assessmentHTML += `
                </ul>
            </div>
        `;

        // Show follow-up questions based on vulnerable areas
        if (results.vulnerableAreas.includes('NIK')) {
            assessmentHTML += `
                <div class="follow-up-section">
                    <h3>🆔 Keamanan NIK & KTP</h3>
                    <p>Kamu rentan terhadap risiko kebocoran NIK. Mari kita cek lebih detail:</p>
                    <div class="question-flow">
                        <h4>Apakah kamu menyimpan foto KTP di perangkat pribadi?</h4>
                        <div class="button-group">
                            <button onclick="showKTPStorageQuestion(true)" class="choice-btn">Ya, saya simpan</button>
                            <button onclick="showKTPStorageQuestion(false)" class="choice-btn">Tidak, saya tidak simpan</button>
                        </div>
                        <div id="ktp-storage-details" class="hidden"></div>
                    </div>
                </div>
            `;
        }

        if (results.vulnerableAreas.includes('OTP/Phone Security')) {
            assessmentHTML += `
                <div class="follow-up-section">
                    <h3>📱 Keamanan OTP & Telepon</h3>
                    <p>Kamu rentan terhadap risiko kebocoran OTP. Mari kita cek lebih detail:</p>
                    <div class="question-flow">
                        <h4>Bagaimana kebiasaanmu dalam menerima dan menggunakan OTP?</h4>
                        <div class="button-group">
                            <button onclick="showOTPUsageQuestion('careless')" class="choice-btn">Sering membagikan OTP</button>
                            <button onclick="showOTPUsageQuestion('careful')" class="choice-btn">Sangat berhati-hati</button>
                        </div>
                        <div id="otp-usage-details" class="hidden"></div>
                    </div>
                </div>
            `;
        }

        if (results.vulnerableAreas.includes('Email Security')) {
            assessmentHTML += `
                <div class="follow-up-section">
                    <h3>📧 Keamanan Email</h3>
                    <p>Email kamu berisiko. Mari kita periksa kebiasaan penggunaan email:</p>
                    <div class="question-flow">
                        <h4>Apakah kamu menggunakan password yang sama untuk email dan akun lainnya?</h4>
                        <div class="button-group">
                            <button onclick="showEmailSecurityTips(true)" class="choice-btn">Ya, password sama</button>
                            <button onclick="showEmailSecurityTips(false)" class="choice-btn">Tidak, password berbeda</button>
                        </div>
                        <div id="email-security-details" class="hidden"></div>
                    </div>
                </div>
            `;
        }

        if (results.vulnerableAreas.includes('Security Questions')) {
            assessmentHTML += `
                <div class="follow-up-section">
                    <h3>🔐 Pertanyaan Keamanan</h3>
                    <p>Kamu rentan terhadap risiko kebocoran pertanyaan keamanan. Mari kita cek lebih detail:</p>
                    <div class="question-flow">
                        <h4>Bagaimana kamu memilih jawaban untuk pertanyaan keamanan?</h4>
                        <div class="button-group">
                            <button onclick="showSecurityQuestionTips('real')" class="choice-btn">Menggunakan jawaban sebenarnya</button>
                            <button onclick="showSecurityQuestionTips('fake')" class="choice-btn">Menggunakan jawaban acak</button>
                        </div>
                        <div id="security-question-details" class="hidden"></div>
                    </div>
                </div>
            `;
        }

        if (results.vulnerableAreas.includes('Data Breach Response')) {
            assessmentHTML += `
                <div class="follow-up-section">
                    <h3>🚨 Respons Kebocoran Data</h3>
                    <p>Kamu perlu meningkatkan respons terhadap kebocoran data. Mari kita cek lebih detail:</p>
                    <div class="question-flow">
                        <h4>Apa yang biasanya kamu lakukan jika menduga ada kebocoran data?</h4>
                        <div class="button-group">
                            <button onclick="showBreachResponseTips('ignore')" class="choice-btn">Tidak melakukan apa-apa</button>
                            <button onclick="showBreachResponseTips('act')" class="choice-btn">Segera mengambil tindakan</button>
                        </div>
                        <div id="breach-response-details" class="hidden"></div>
                    </div>
                </div>
            `;
        }
    } else {
        assessmentHTML += `
            <div class="excellent-security">
                <h3>🎉 Keamanan Kamu Sudah Sangat Baik!</h3>
                <p>Meski begitu, tetap pelajari tips tambahan untuk menjaga keamanan optimal.</p>
            </div>
        `;
    }

    assessmentContainer.innerHTML = assessmentHTML;
}

/* Follow-up KTP */
function showKTPStorageQuestion(hasKTP) {
    const detailsDiv = document.getElementById('ktp-storage-details');
    detailsDiv.classList.remove('hidden');
    
    if (hasKTP) {
        detailsDiv.innerHTML = `
            <div class="sub-question">
                <h4>Di mana kamu menyimpan foto KTP?</h4>
                <div class="button-group">
                    <button onclick="showDeviceTypeQuestion('smartphone')" class="choice-btn">Smartphone</button>
                    <button onclick="showDeviceTypeQuestion('computer')" class="choice-btn">Komputer</button>
                </div>
                <div id="device-type-details" class="hidden"></div>
            </div>
        `;
    } else {
        detailsDiv.innerHTML = `
            <div class="good-practice">
                <h4>✅ Bagus! Ini adalah praktik yang baik.</h4>
                <p>Tidak menyimpan foto KTP di perangkat pribadi mengurangi risiko penyalahgunaan jika perangkat hilang atau diretas.</p>
                <div class="tips-box">
                    <h5>Tips Tambahan:</h5>
                    <ul>
                        <li>Jika terpaksa harus menyimpan, gunakan aplikasi dengan enkripsi kuat</li>
                        <li>Selalu hapus foto KTP setelah tidak diperlukan</li>
                        <li>Jangan pernah upload foto KTP ke cloud storage publik</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

function showDeviceTypeQuestion(deviceType) {
    const detailsDiv = document.getElementById('device-type-details');
    detailsDiv.classList.remove('hidden');
    
    if (deviceType === 'smartphone') {
        detailsDiv.innerHTML = `
            <div class="sub-question">
                <h4>Jenis smartphone apa yang kamu gunakan?</h4>
                <div class="button-group">
                    <button onclick="showSmartphoneTips('android')" class="choice-btn">Android</button>
                    <button onclick="showSmartphoneTips('ios')" class="choice-btn">iPhone (iOS)</button>
                </div>
                <div id="smartphone-tips" class="hidden"></div>
            </div>
        `;
    } else {
        detailsDiv.innerHTML = `
            <div class="sub-question">
                <h4>Jenis komputer apa yang kamu gunakan?</h4>
                <div class="button-group">
                    <button onclick="showComputerTips('windows')" class="choice-btn">Windows</button>
                    <button onclick="showComputerTips('mac')" class="choice-btn">Mac</button>
                </div>
                <div id="computer-tips" class="hidden"></div>
            </div>
        `;
    }
}

function showSmartphoneTips(osType) {
    const tipsDiv = document.getElementById('smartphone-tips');
    tipsDiv.classList.remove('hidden');
    
    let tips = '';
    if (osType === 'android') {
        tips = `
            <div class="security-tips">
                <h5>🔒 Tips Keamanan untuk Android:</h5>
                <div class="warning-box">
                    <p><strong>⚠️ Risiko:</strong> Foto KTP di smartphone Android rentan jika:</p>
                    <ul>
                        <li>Tidak ada screen lock atau menggunakan pola yang mudah ditebak</li>
                        <li>Aplikasi galeri tidak terkunci</li>
                        <li>Auto-backup ke Google Photos aktif</li>
                    </ul>
                </div>
                <div class="action-steps">
                    <h6>Langkah Pengamanan:</h6>
                    <ol>
                        <li><strong>Aktifkan Screen Lock Kuat:</strong> Gunakan PIN 6 digit, password, atau biometrik</li>
                        <li><strong>Gunakan Secure Folder:</strong> Samsung Knox atau aplikasi seperti Vaulty</li>
                        <li><strong>Matikan Auto-Backup:</strong> Settings > Google > Backup > Photos backup OFF</li>
                        <li><strong>Enkripsi Perangkat:</strong> Settings > Security > Encrypt device</li>
                        <li><strong>Install Antivirus:</strong> Gunakan Bitdefender atau Kaspersky Mobile</li>
                    </ol>
                </div>
            </div>
        `;
    } else {
        tips = `
            <div class="security-tips">
                <h5>🔒 Tips Keamanan untuk iPhone:</h5>
                <div class="warning-box">
                    <p><strong>⚠️ Risiko:</strong> Foto KTP di iPhone rentan jika:</p>
                    <ul>
                        <li>Tidak ada Face ID/Touch ID atau passcode lemah</li>
                        <li>iCloud Photos sync aktif</li>
                        <li>Sharing foto melalui AirDrop terbuka untuk semua</li>
                    </ul>
                </div>
                <div class="action-steps">
                    <h6>Langkah Pengamanan:</h6>
                    <ol>
                        <li><strong>Aktifkan Face ID/Touch ID:</strong> Settings > Face ID & Passcode</li>
                        <li><strong>Gunakan Hidden Album:</strong> Photos > Select > Hide > Move to Hidden Album</li>
                        <li><strong>Matikan iCloud Photos:</strong> Settings > [Your Name] > iCloud > Photos OFF</li>
                        <li><strong>Atur AirDrop:</strong> Control Center > AirDrop > Contacts Only</li>
                        <li><strong>Gunakan Notes dengan Lock:</strong> Notes app > Lock note dengan password</li>
                    </ol>
                </div>
            </div>
        `;
    }
    
    tipsDiv.innerHTML = tips;
}

function showComputerTips(osType) {
    const tipsDiv = document.getElementById('computer-tips');
    tipsDiv.classList.remove('hidden');
    
    let tips = '';
    if (osType === 'windows') {
        tips = `
            <div class="security-tips">
                <h5>🔒 Tips Keamanan untuk Windows:</h5>
                <div class="warning-box">
                    <p><strong>⚠️ Risiko:</strong> Foto KTP di Windows rentan jika:</p>
                    <ul>
                        <li>Tidak ada password login atau password lemah</li>
                        <li>File tersimpan di folder yang mudah diakses</li>
                        <li>OneDrive sync aktif</li>
                        <li>Tidak ada enkripsi file</li>
                    </ul>
                </div>
                <div class="action-steps">
                    <h6>Langkah Pengamanan:</h6>
                    <ol>
                        <li><strong>Aktifkan BitLocker:</strong> Control Panel > BitLocker Drive Encryption</li>
                        <li><strong>Gunakan Password Kuat:</strong> Settings > Accounts > Sign-in options</li>
                        <li><strong>Enkripsi File:</strong> Right-click file > Properties > Advanced > Encrypt</li>
                        <li><strong>Matikan OneDrive Sync:</strong> OneDrive settings > Unlink this PC</li>
                        <li><strong>Gunakan Folder Tersembunyi:</strong> Buat folder dengan atribut hidden</li>
                        <li><strong>Install Antivirus:</strong> Windows Defender atau Bitdefender</li>
                    </ol>
                </div>
            </div>
        `;
    } else {
        tips = `
            <div class="security-tips">
                <h5>🔒 Tips Keamanan untuk Mac:</h5>
                <div class="warning-box">
                    <p><strong>⚠️ Risiko:</strong> Foto KTP di Mac rentan jika:</p>
                    <ul>
                        <li>Tidak ada password login atau Touch ID</li>
                        <li>iCloud Drive sync aktif</li>
                        <li>FileVault tidak diaktifkan</li>
                        <li>Sharing files melalui AirDrop terbuka</li>
                    </ul>
                </div>
                <div class="action-steps">
                    <h6>Langkah Pengamanan:</h6>
                    <ol>
                        <li><strong>Aktifkan FileVault:</strong> System Preferences > Security & Privacy > FileVault</li>
                        <li><strong>Gunakan Touch ID:</strong> System Preferences > Touch ID</li>
                        <li><strong>Matikan iCloud Drive:</strong> System Preferences > Apple ID > iCloud Drive OFF</li>
                        <li><strong>Atur AirDrop:</strong> Finder > AirDrop > Contacts Only</li>
                        <li><strong>Gunakan Encrypted Disk Image:</strong> Disk Utility > New Image > Encrypted</li>
                        <li><strong>Aktifkan Firewall:</strong> System Preferences > Security & Privacy > Firewall</li>
                    </ol>
                </div>
            </div>
        `;
    }
    
    tipsDiv.innerHTML = tips;
}

/* OTP/Phone Security Follow-up */
function showOTPUsageQuestion(usageType) {
    const detailsDiv = document.getElementById('otp-usage-details');
    detailsDiv.classList.remove('hidden');
    
    if (usageType === 'careless') {
        detailsDiv.innerHTML = `
            <div class="critical-warning">
                <h4>🚨 Praktik yang Sangat Berisiko!</h4>
                <p>Membagikan OTP dapat menyebabkan penipuan dan pencurian akun!</p>
                <div class="risk-explanation">
                    <h5>Mengapa ini berbahaya?</h5>
                    <ul>
                        <li>OTP adalah kunci satu kali untuk mengakses akun Anda</li>
                        <li>Penipu bisa mengakses rekening bank, e-wallet, atau akun penting lainnya</li>
                        <li>OTP tidak boleh dibagikan kepada siapapun termasuk petugas bank</li>
                    </ul>
                </div>
                <div class="immediate-actions">
                    <h5>🚨 Tindakan Segera yang Harus Dilakukan:</h5>
                    <ol>
                        <li><strong>Jangan pernah membagikan OTP</strong> kepada siapapun</li>
                        <li><strong>Waspada panggilan/SMS</strong> yang meminta OTP</li>
                        <li><strong>Ganti nomor telepon</strong> jika sering menerima permintaan OTP mencurigakan</li>
                        <li><strong>Aktifkan notifikasi transaksi</strong> dari bank/e-wallet</li>
                        <li><strong>Blokir nomor</strong> yang mengirim permintaan OTP mencurigakan</li>
                    </ol>
                </div>
                <div class="additional-tips">
                    <h5>Tips Tambahan:</h5>
                    <ul>
                        <li>Bank tidak akan pernah meminta OTP via telepon</li>
                        <li>OTP hanya untuk verifikasi transaksi yang Anda lakukan sendiri</li>
                        <li>Jika ragu, hubungi call center resmi bank/e-wallet</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        detailsDiv.innerHTML = `
            <div class="good-practice">
                <h4>✅ Bagus! Kamu sudah berhati-hati dengan OTP</h4>
                <p>Menjaga kerahasiaan OTP adalah langkah penting dalam keamanan digital.</p>
                <div class="additional-tips">
                    <h5>Tips Tambahan untuk Keamanan OTP:</h5>
                    <ul>
                        <li><strong>Verifikasi pengirim SMS OTP</strong> - pastikan dari nomor resmi</li>
                        <li><strong>Periksa transaksi terkait</strong> sebelum memasukkan OTP</li>
                        <li><strong>Gunakan aplikasi authenticator</strong> sebagai pengganti SMS OTP jika memungkinkan</li>
                        <li><strong>Segera laporkan</strong> jika menerima OTP tanpa melakukan transaksi</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

/* Follow-up Email */
function showEmailSecurityTips(samePassword) {
    const detailsDiv = document.getElementById('email-security-details');
    detailsDiv.classList.remove('hidden');
    
    if (samePassword) {
        detailsDiv.innerHTML = `
            <div class="critical-warning">
                <h4>🚨 Bahaya! Ini Sangat Berisiko</h4>
                <p>Menggunakan password yang sama untuk email dan akun lain adalah praktik yang sangat berbahaya!</p>
                <div class="risk-explanation">
                    <h5>Mengapa ini berbahaya?</h5>
                    <ul>
                        <li>Jika satu akun diretas, semua akun lain ikut terancam</li>
                        <li>Email adalah kunci untuk reset password akun lain</li>
                        <li>Hacker bisa mengakses bank, e-commerce, media sosial sekaligus</li>
                    </ul>
                </div>
                <div class="immediate-actions">
                    <h5>🚨 Tindakan Segera yang Harus Dilakukan:</h5>
                    <ol>
                        <li><strong>Ganti Password Email:</strong> Buat password unik dan kuat</li>
                        <li><strong>Aktifkan Two Factor Authentication:</strong> Gmail, Yahoo, Outlook semua support Two Factor Authentication</li>
                        <li><strong>Ganti Password Akun Penting:</strong> Bank, e-wallet, e-commerce</li>
                        <li><strong>Gunakan Password Manager:</strong> Bitwarden, 1Password, atau LastPass</li>
                        <li><strong>Cek Aktivitas Login:</strong> Periksa login mencurigakan di semua akun</li>
                    </ol>
                </div>
            </div>
        `;
    } else {
        detailsDiv.innerHTML = `
            <div class="good-practice">
                <h4>✅ Bagus! Kamu sudah menerapkan praktik yang baik</h4>
                <p>Menggunakan password berbeda untuk setiap akun adalah langkah keamanan yang sangat penting.</p>
                <div class="additional-tips">
                    <h5>Tips Tambahan untuk Keamanan Email:</h5>
                    <ul>
                        <li><strong>Aktifkan Two Factor Authentication:</strong> Jika belum, segera aktifkan autentikasi dua faktor</li>
                        <li><strong>Periksa Login Activity:</strong> Cek secara berkala aktivitas login yang mencurigakan</li>
                        <li><strong>Hati-hati Email Phishing:</strong> Jangan klik link dari email yang mencurigakan</li>
                        <li><strong>Update Recovery Info:</strong> Pastikan nomor HP dan email recovery terbaru</li>
                        <li><strong>Gunakan Email Alias:</strong> Untuk registrasi situs yang tidak penting</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

/* Security Questions Follow-up */
function showSecurityQuestionTips(answerType) {
    const detailsDiv = document.getElementById('security-question-details');
    detailsDiv.classList.remove('hidden');
    
    if (answerType === 'real') {
        detailsDiv.innerHTML = `
            <div class="warning-box">
                <h4>⚠️ Ini Bisa Berbahaya</h4>
                <p>Menggunakan jawaban sebenarnya untuk pertanyaan keamanan membuat akun Anda rentan.</p>
                <div class="risk-explanation">
                    <h5>Mengapa ini berisiko?</h5>
                    <ul>
                        <li>Informasi pribadi bisa ditemukan di media sosial atau sumber publik</li>
                        <li>Penipu bisa menjawab pertanyaan keamanan dengan mudah</li>
                        <li>Banyak data pribadi telah bocor dalam berbagai kebocoran data</li>
                    </ul>
                </div>
                <div class="action-steps">
                    <h5>Langkah Pengamanan:</h5>
                    <ol>
                        <li><strong>Gunakan jawaban acak</strong> untuk pertanyaan keamanan</li>
                        <li><strong>Simpan jawaban</strong> di password manager yang aman</li>
                        <li><strong>Hindari pertanyaan</strong> yang jawabannya mudah ditebak</li>
                        <li><strong>Gunakan autentikasi dua faktor</strong> sebagai pengganti pertanyaan keamanan</li>
                    </ol>
                </div>
            </div>
        `;
    } else {
        detailsDiv.innerHTML = `
            <div class="good-practice">
                <h4>✅ Strategi yang Baik!</h4>
                <p>Menggunakan jawaban acak untuk pertanyaan keamanan membuat akun Anda lebih aman.</p>
                <div class="additional-tips">
                    <h5>Tips Tambahan:</h5>
                    <ul>
                        <li><strong>Buat pola</strong> untuk mengingat jawaban acak</li>
                        <li><strong>Gunakan kombinasi</strong> huruf, angka, dan simbol</li>
                        <li><strong>Perbarui secara berkala</strong> jawaban keamanan Anda</li>
                        <li><strong>Hindari menyimpan</strong> di tempat yang mudah diakses</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

/* Data Breach Response Follow-up */
function showBreachResponseTips(responseType) {
    const detailsDiv = document.getElementById('breach-response-details');
    detailsDiv.classList.remove('hidden');
    
    if (responseType === 'ignore') {
        detailsDiv.innerHTML = `
            <div class="critical-warning">
                <h4>🚨 Sikap yang Sangat Berisiko!</h4>
                <p>Mengabaikan tanda-tanda kebocoran data bisa berakibat fatal.</p>
                <div class="risk-explanation">
                    <h5>Apa risikonya?</h5>
                    <ul>
                        <li>Penipu bisa mengakses akun-akun Anda</li>
                        <li>Identitas Anda bisa digunakan untuk kejahatan</li>
                        <li>Anda bisa mengalami kerugian finansial</li>
                        <li>Reputasi online Anda bisa rusak</li>
                    </ul>
                </div>
                <div class="immediate-actions">
                    <h5>Langkah Penting yang Harus Dilakukan:</h5>
                    <ol>
                        <li><strong>Segera ganti password</strong> semua akun penting</li>
                        <li><strong>Aktifkan 2 Factor Authentication</strong> di semua akun yang mendukung</li>
                        <li><strong>Pantau aktivitas</strong> di akun finansial</li>
                        <li><strong>Bekukan kartu kredit</strong> jika diperlukan</li>
                        <li><strong>Laporkan ke pihak berwenang</strong> jika ada indikasi penipuan</li>
                    </ol>
                </div>
            </div>
        `;
    } else {
        detailsDiv.innerHTML = `
            <div class="good-practice">
                <h4>✅ Sikap yang Bertanggung Jawab!</h4>
                <p>Segera mengambil tindakan saat menduga ada kebocoran data adalah langkah tepat.</p>
                <div class="additional-tips">
                    <h5>Checklist Respons Kebocoran Data:</h5>
                    <ul>
                        <li><strong>Verifikasi kebocoran</strong> melalui situs seperti haveibeenpwned.com</li>
                        <li><strong>Prioritaskan akun penting</strong> seperti email, bank, dan media sosial</li>
                        <li><strong>Periksa aktivitas mencurigakan</strong> di semua akun</li>
                        <li><strong>Waspada phishing</strong> setelah kebocoran data</li>
                        <li><strong>Pertimbangkan credit freeze</strong> jika data finansial terancam</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

// Menghapus semua data dari local storage saat halaman dimuat
// window.onload = function() {
// localStorage.clear(); // Untuk menghapus data dari localStorage
// sessionStorage.clear(); // Jika ingin menghapus data dari sessionStorage };

// Initialize tips page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('tips.html')) {
        initializeTipsPage();
    }
});