// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCK6L4OG25KOOh5J1_PwAs_i7djJIguM4Q",
  authDomain: "otoimoveis-24aed.firebaseapp.com",
  projectId: "otoimoveis-24aed",
  storageBucket: "otoimoveis-24aed.firebasestorage.app",
  messagingSenderId: "221131575956",
  appId: "1:221131575956:web:76424ba087b1566c9bda81"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Configuração do Cloudinary
const cloudinaryWidget = cloudinary.createUploadWidget({
  cloudName: 'djqu0ov54',
  uploadPreset: 'oto_upload'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    const photoURL = result.info.secure_url;
    document.getElementById('photoURL').textContent = photoURL;
    document.getElementById('photoURL').style.display = 'block';
  }
});

document.getElementById('uploadWidget').addEventListener('click', () => {
  cloudinaryWidget.open();
});

const form = document.getElementById('uploadForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const photoURL = document.getElementById('photoURL').textContent;

  if (!photoURL) {
    alert('Por favor, faça o upload de uma foto primeiro!');
    return;
  }

  try {
    await db.collection('imoveis').add({
      title,
      description,
      photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('Imóvel publicado com sucesso!');
    form.reset();
    document.getElementById('photoURL').style.display = 'none';
  } catch (error) {
    alert('Erro ao publicar imóvel.');
  }
});
