const submitBtn = document.getElementById("submit-btn");
const nama = document.getElementById("nama");
const umur = document.getElementById("umur");
const hobi = document.getElementById("hobi");

// Inisialisasi data jika belum ada di localStorage
if (!localStorage.getItem("data")) {
  const initialData = [
    { id: 1, nama: "Faisal", umur: 26, hobi: "Hobi 1" },
    { id: 2, nama: "Yudha", umur: 26, hobi: "Hobi 2" },
    { id: 3, nama: "Nugraha", umur: 26, hobi: "Hobi 3" },
  ];
  localStorage.setItem("data", JSON.stringify(initialData));
}

//   mengambil data dari LS
const existingData = JSON.parse(localStorage.getItem("data")) || [];

submitBtn.addEventListener("click", () => {
  const data = {
    nama: nama.value,
    umur: umur.value,
    hobi: hobi.value,
  };

  const index = submitBtn.dataset.index;

  if (index !== undefined) {
    // Jika dalam mode edit
    existingData[index] = data;
    submitBtn.textContent = "tambah data";
    submitBtn.dataset.index = "";
  } else {
    // Jika dalam mode tambah data
    existingData.push(data);
  }

  // Simpan data di localStorage
  localStorage.setItem("data", JSON.stringify(existingData));

  // Tampilkan data di element result
  showData();

  // Reset nilai input form
  nama.value = "";
  umur.value = "";
  hobi.value = "";
});

const showData = () => {
  const resultDiv = document.getElementById("result");

  // Bersihkan tampilan
  resultDiv.innerHTML = "";

  existingData.forEach((data, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>Nama: ${data.nama}</span><br/>
      <span>Umur: ${data.umur}</span><br/>
      <span>Hobi: ${data.hobi}</span><br/>
      <button onclick="editData(${index})">Edit</button>
      <button onclick="deleteData(${index})">Hapus</button>
    `;
    resultDiv.appendChild(div);
  });
};

const editData = (index) => {
  submitBtn.textContent = "simpan";
  submitBtn.dataset.index = index;
  const data = existingData[index];
  nama.value = data.nama;
  umur.value = data.umur;
  hobi.value = data.hobi;
};

const deleteData = (index) => {
  existingData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(existingData));
  showData();
};

// Tampilkan data saat pertama kali halaman dimuat
showData();
