// Fungsi untuk menghitung jumlah korupsi per periode waktu
function hitungKorupsi(nominal, satuan, hukumanTahun) {
  // Mengalikan nominal dengan satuan
  const nominalTotal = nominal * satuan;

  const waktu = {
    Tahun: 1,
    Bulan: 12,
    Minggu: 52,
    Hari: 365,
    Jam: 365 * 24,
    Menit: 365 * 24 * 60,
    Detik: 365 * 24 * 60 * 60,
  };

  const totalKorupsi = {};
  for (const unit in waktu) {
    totalKorupsi[unit] = nominalTotal / (hukumanTahun * waktu[unit]);
  }

  return totalKorupsi;
}

// Event Listener untuk form
document.getElementById("korupsiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nominal = parseFloat(document.getElementById("nominal").value);
  const satuan = parseFloat(document.getElementById("satuanNominal").value);
  const hukuman = parseFloat(document.getElementById("hukuman").value);

  if (isNaN(nominal) || isNaN(hukuman) || nominal <= 0 || hukuman <= 0) {
    alert("Masukkan nilai nominal dan hukuman yang valid.");
    return;
  }

  const hasil = hitungKorupsi(nominal, satuan, hukuman);
  const hasilTable = document.getElementById("hasilTable");

  // Reset isi tabel
  hasilTable.innerHTML = "";

  // Menambahkan hasil ke tabel
  // Fungsi untuk mengonversi angka ke satuan dalam bentuk tulisan
  function formatSatuan(value) {
    if (value >= 1_000_000_000_000) {
      return (value / 1_000_000_000_000).toFixed(2) + " triliun";
    } else if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + " miliar";
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + " juta";
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(2) + " ribu";
    } else {
      return value.toFixed(2) + " perak";
    }
  }

  // Menambahkan hasil ke tabel
  for (const periode in hasil) {
    const row = `
      <tr>
        <td>${periode}</td>
        <td>Rp ${formatSatuan(hasil[periode])}</td>
      </tr>
    `;
    hasilTable.innerHTML += row;
  }

  // Tampilkan tabel hasil
  document.getElementById("hasilContainer").style.display = "block";
});
