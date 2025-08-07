// Firebase Imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDyzogjnyeWFjxvlUQ_4uOzTPoL6mFKtmc",
  authDomain: "pversion-95.firebaseapp.com",
  projectId: "pversion-95",
  storageBucket: "pversion-95.appspot.com",
  messagingSenderId: "938239141789",
  appId: "1:938239141789:web:ea9ae74a30b2b5e0fdf174",
  measurementId: "G-3BGH8WW2NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase Initialized");

// --- DOM Elements ---
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const htmlEl = document.documentElement;

// --- Theme Switching ---
const applyTheme = (theme) => {
    if (theme === 'dark') {
        htmlEl.classList.add('dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        htmlEl.classList.remove('dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
};

themeToggleBtn.addEventListener('click', toggleTheme);

// Apply saved theme on initial load
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

// --- Language Switching ---
const translations = {
    en: {
        'ลงชื่อเข้าใช้งาน': 'Sign In',
        'อีเมล์ หรือ ชื่อผู้ใช้งาน': 'Email or Username',
        'รหัสผ่าน': 'Password',
        'ยังไม่มีบัญชี?': "Don't have an account?",
        'สมัครสมาชิก': 'Sign Up',
        'มีบัญชีอยู่แล้ว?': 'Already have an account?',
        'ชื่อ': 'First Name',
        'นามสกุล': 'Last Name',
        'อีเมล์': 'Email',
        'ชื่อผู้ใช้งาน': 'Username',
        'วันเดือนปีเกิด': 'Date of Birth',
        'ระดับผู้ใช้งาน': 'User Level',
        'ข้อมูลผู้ใช้งาน': 'User Profile',
        'แก้ไขข้อมูล': 'Edit Profile',
        'ยกเลิก': 'Cancel',
        'บันทึก': 'Save',
        'ออกจากระบบ': 'Sign Out',
        'Auth App': 'Auth App'
    },
    th: {
        'Sign In': 'ลงชื่อเข้าใช้งาน',
        'Email or Username': 'อีเมล์ หรือ ชื่อผู้ใช้งาน',
        'Password': 'รหัสผ่าน',
        "Don't have an account?": 'ยังไม่มีบัญชี?',
        'Sign Up': 'สมัครสมาชิก',
        'Already have an account?': 'มีบัญชีอยู่แล้ว?',
        'First Name': 'ชื่อ',
        'Last Name': 'นามสกุล',
        'Email': 'อีเมล์',
        'Username': 'ชื่อผู้ใช้งาน',
        'Date of Birth': 'วันเดือนปีเกิด',
        'User Level': 'ระดับผู้ใช้งาน',
        'User Profile': 'ข้อมูลผู้ใช้งาน',
        'Edit Profile': 'แก้ไขข้อมูล',
        'Cancel': 'ยกเลิก',
        'Save': 'บันทึก',
        'Sign Out': 'ออกจากระบบ',
        'Auth App': 'Auth App'
    }
};

let currentLang = 'th';

const langThBtn = document.getElementById('lang-th-btn');
const langEnBtn = document.getElementById('lang-en-btn');

const translatableElements = {
    signInTitle: document.querySelector('#sign-in-section h2'),
    signInEmailLabel: document.querySelector('label[for="signin-email-user"]'),
    signInPasswordLabel: document.querySelector('label[for="signin-password"]'),
    signInSubmitBtn: document.querySelector('#sign-in-form button[type="submit"]'),
    goToSignUp: document.querySelector('#go-to-signup'),
    goToSignUpPrompt: document.querySelector('#sign-in-section p'),

    signUpTitle: document.querySelector('#sign-up-section h2'),
    signUpFirstNameLabel: document.querySelector('label[for="signup-firstname"]'),
    signUpLastNameLabel: document.querySelector('label[for="signup-lastname"]'),
    signUpEmailLabel: document.querySelector('label[for="signup-email"]'),
    signUpUsernameLabel: document.querySelector('label[for="signup-username"]'),
    signUpDobLabel: document.querySelector('label[for="signup-dob"]'),
    signUpPasswordLabel: document.querySelector('label[for="signup-password"]'),
    signUpUserLevelLabel: document.querySelector('label[for="user-level"]'),
    signUpSubmitBtn: document.querySelector('#sign-up-form button[type="submit"]'),
    goToSignIn: document.querySelector('#go-to-signin'),
    goToSignInPrompt: document.querySelector('#sign-up-section p'),

    profileTitle: document.querySelector('#profile-section h2'),
    editProfileTitle: document.querySelector('#edit-profile-form-container h3'),
    editFirstNameLabel: document.querySelector('label[for="edit-firstname"]'),
    editLastNameLabel: document.querySelector('label[for="edit-lastname"]'),
    editDobLabel: document.querySelector('label[for="edit-dob"]'),
    cancelEditBtn: document.getElementById('cancel-edit-btn'),
    saveEditBtn: document.querySelector('#edit-profile-form button[type="submit"]'),
    editProfileBtn: document.getElementById('edit-profile-btn'),
    signOutBtn: document.getElementById('sign-out-btn'),
    headerTitle: document.querySelector('header h1')
};

const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Titles and buttons
    translatableElements.signInTitle.textContent = lang === 'th' ? 'ลงชื่อเข้าใช้งาน' : 'Sign In';
    translatableElements.signInSubmitBtn.textContent = lang === 'th' ? 'ลงชื่อเข้าใช้งาน' : 'Sign In';
    translatableElements.signUpTitle.textContent = lang === 'th' ? 'สมัครสมาชิก' : 'Sign Up';
    translatableElements.signUpSubmitBtn.textContent = lang === 'th' ? 'สมัครสมาชิก' : 'Sign Up';
    translatableElements.profileTitle.textContent = lang === 'th' ? 'ข้อมูลผู้ใช้งาน' : 'User Profile';
    translatableElements.editProfileTitle.textContent = lang === 'th' ? 'แก้ไขข้อมูล' : 'Edit Profile';
    translatableElements.saveEditBtn.textContent = lang === 'th' ? 'บันทึก' : 'Save';
    translatableElements.cancelEditBtn.textContent = lang === 'th' ? 'ยกเลิก' : 'Cancel';
    translatableElements.editProfileBtn.textContent = lang === 'th' ? 'แก้ไขข้อมูล' : 'Edit Profile';
    translatableElements.signOutBtn.textContent = lang === 'th' ? 'ออกจากระบบ' : 'Sign Out';
    translatableElements.headerTitle.textContent = 'Auth App';

    // Labels
    translatableElements.signInEmailLabel.textContent = lang === 'th' ? 'อีเมล์ หรือ ชื่อผู้ใช้งาน' : 'Email or Username';
    translatableElements.signInPasswordLabel.textContent = lang === 'th' ? 'รหัสผ่าน' : 'Password';
    translatableElements.signUpFirstNameLabel.textContent = lang === 'th' ? 'ชื่อ' : 'First Name';
    translatableElements.signUpLastNameLabel.textContent = lang === 'th' ? 'นามสกุล' : 'Last Name';
    translatableElements.signUpEmailLabel.textContent = lang === 'th' ? 'อีเมล์' : 'Email';
    translatableElements.signUpUsernameLabel.textContent = lang === 'th' ? 'ชื่อผู้ใช้งาน' : 'Username';
    translatableElements.signUpDobLabel.textContent = lang === 'th' ? 'วันเดือนปีเกิด' : 'Date of Birth';
    translatableElements.signUpPasswordLabel.textContent = lang === 'th' ? 'รหัสผ่าน' : 'Password';
    translatableElements.signUpUserLevelLabel.textContent = lang === 'th' ? 'ระดับผู้ใช้งาน' : 'User Level';
    translatableElements.editFirstNameLabel.textContent = lang === 'th' ? 'ชื่อ' : 'First Name';
    translatableElements.editLastNameLabel.textContent = lang === 'th' ? 'นามสกุล' : 'Last Name';
    translatableElements.editDobLabel.textContent = lang === 'th' ? 'วันเดือนปีเกิด' : 'Date of Birth';

    // Link prompts
    translatableElements.goToSignUpPrompt.childNodes[0].nodeValue = lang === 'th' ? 'ยังไม่มีบัญชี? ' : "Don't have an account? ";
    translatableElements.goToSignUp.textContent = lang === 'th' ? 'สมัครสมาชิก' : 'Sign Up';
    translatableElements.goToSignInPrompt.childNodes[0].nodeValue = lang === 'th' ? 'มีบัญชีอยู่แล้ว? ' : 'Already have an account? ';
    translatableElements.goToSignIn.textContent = lang === 'th' ? 'ลงชื่อเข้าใช้' : 'Sign In';

    // Update button styles
    if (lang === 'th') {
        langThBtn.classList.add('bg-gray-200', 'dark:bg-gray-700');
        langEnBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
    } else {
        langEnBtn.classList.add('bg-gray-200', 'dark:bg-gray-700');
        langThBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
    }
};

langThBtn.addEventListener('click', () => setLanguage('th'));
langEnBtn.addEventListener('click', () => setLanguage('en'));

// Apply saved language on initial load
const savedLang = localStorage.getItem('lang') || 'th';
setLanguage(savedLang);

// --- View Switching ---
const signInSection = document.getElementById('sign-in-section');
const signUpSection = document.getElementById('sign-up-section');
const profileSection = document.getElementById('profile-section');
const goToSignUpLink = document.getElementById('go-to-signup');
const goToSignInLink = document.getElementById('go-to-signin');

const showSection = (sectionToShow) => {
    signInSection.classList.add('hidden');
    signUpSection.classList.add('hidden');
    profileSection.classList.add('hidden');
    sectionToShow.classList.remove('hidden');
};

goToSignUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(signUpSection);
});

goToSignInLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(signInSection);
});

// --- Firebase Auth Logic ---

// Sign Up
const signUpForm = document.getElementById('sign-up-form');
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const dob = document.getElementById('signup-dob').value;
    const password = document.getElementById('signup-password').value;
    const userLevel = document.getElementById('user-level').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user info to Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            username,
            dob,
            email,
            userLevel,
            uid: user.uid
        });

        alert('Sign up successful!');
        // The onAuthStateChanged listener will handle showing the profile section
    } catch (error) {
        console.error("Error signing up:", error);
        alert(`Error: ${error.message}`);
    }
});

// Sign Out
const signOutBtn = document.getElementById('sign-out-btn');
signOutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('Signed out successfully.');
    } catch (error) {
        console.error("Error signing out:", error);
        alert(`Error: ${error.message}`);
    }
});

// Edit Profile Logic
const editProfileBtn = document.getElementById('edit-profile-btn');
const editProfileFormContainer = document.getElementById('edit-profile-form-container');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const editProfileForm = document.getElementById('edit-profile-form');
const profileDetails = document.getElementById('profile-details');

editProfileBtn.addEventListener('click', () => {
    profileDetails.classList.add('hidden');
    editProfileFormContainer.classList.remove('hidden');
});

cancelEditBtn.addEventListener('click', () => {
    editProfileFormContainer.classList.add('hidden');
    profileDetails.classList.remove('hidden');
});

editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
        alert("No user is signed in.");
        return;
    }

    const updatedData = {
        firstName: document.getElementById('edit-firstname').value,
        lastName: document.getElementById('edit-lastname').value,
        dob: document.getElementById('edit-dob').value,
    };

    try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, updatedData);
        alert("Profile updated successfully!");

        // Hide form and show updated details
        editProfileFormContainer.classList.add('hidden');
        profileDetails.classList.remove('hidden');
        // The auth state listener will re-fetch and display the data,
        // but we can also update it manually for instant feedback.
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
             const userData = userDocSnap.data();
            profileDetails.innerHTML = `
                <p><strong>ชื่อ-นามสกุล:</strong> ${userData.firstName} ${userData.lastName}</p>
                <p><strong>ชื่อผู้ใช้งาน:</strong> ${userData.username}</p>
                <p><strong>อีเมล์:</strong> ${userData.email}</p>
                <p><strong>วันเกิด:</strong> ${userData.dob}</p>
                <p><strong>ระดับ:</strong> ${userData.userLevel}</p>
            `;
        }

    } catch (error) {
        console.error("Error updating profile:", error);
        alert(`Error: ${error.message}`);
    }
});

// Auth State Listener
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            // Populate profile details
            const profileDetails = document.getElementById('profile-details');
            profileDetails.innerHTML = `
                <p><strong>ชื่อ-นามสกุล:</strong> ${userData.firstName} ${userData.lastName}</p>
                <p><strong>ชื่อผู้ใช้งาน:</strong> ${userData.username}</p>
                <p><strong>อีเมล์:</strong> ${userData.email}</p>
                <p><strong>วันเกิด:</strong> ${userData.dob}</p>
                <p><strong>ระดับ:</strong> ${userData.userLevel}</p>
            `;
            // Populate edit form as well
            document.getElementById('edit-firstname').value = userData.firstName;
            document.getElementById('edit-lastname').value = userData.lastName;
            document.getElementById('edit-dob').value = userData.dob;

        } else {
            console.log("No such user document!");
        }
        showSection(profileSection);
    } else {
        // User is signed out
        showSection(signInSection);
    }
});

// Sign In
const signInForm = document.getElementById('sign-in-form');
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginIdentifier = document.getElementById('signin-email-user').value;
    const password = document.getElementById('signin-password').value;
    let email = loginIdentifier;

    try {
        // If the identifier doesn't look like an email, query Firestore for the username
        if (!loginIdentifier.includes('@')) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", loginIdentifier));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("User not found.");
            }

            // Assuming usernames are unique, take the first result
            const userData = querySnapshot.docs[0].data();
            email = userData.email;
        }

        await signInWithEmailAndPassword(auth, email, password);
        alert('Sign in successful!');
        // The onAuthStateChanged listener will handle showing the profile section
    } catch (error) {
        console.error("Error signing in:", error);
        alert(`Error: ${error.message}`);
    }
});
