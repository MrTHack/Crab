const leagueModal = document.getElementById('league-modal');
const closeModal = document.querySelector('.close-modal'); 
const modalLeagueName = document.getElementById('modal-league-name'); 
const currentCoinsSpan = document.getElementById('current-coins'); 
const requiredCoinsSpan = document.getElementById('required-coins');
const crabMain = document.getElementById('crab-main');
const balanceAmount = document.getElementById('balance-amount');
const energyAmount = document.getElementById('energy-amount'); // Получаем элемент для отображения энергии
const progressBarFill = document.querySelector('.progress-bar-fill');
const levelNameSpan = document.getElementById('level-name'); 
const prevLeagueButton = document.getElementById('prev-league');
const nextLeagueButton = document.getElementById('next-league');
const leagueImage = document.querySelector('.league-crab-image img');

let balance = 0;
let energy = 100; 
let levelName = 'Bronze'; 
let currentLeagueIndex = 0;
let isRecovering = false; // Флаг для отслеживания восстановления

const leagues = [
  { name: 'Bronze', image: 'images/crab-league-bronze.png', requiredCoins: 100000 },
  { name: 'Silver', image: 'images/crab-league-silver.png', requiredCoins: 1000000 },
  { name: 'Gold', image: 'images/crab-league-gold.png', requiredCoins: 10000000 },
  { name: 'Diamond', image: 'images/crab-league-diamond.png', requiredCoins: 100000000 }
];

crabMain.addEventListener('click', () => {
  if (energy > 0) {
    energy--;
    energyAmount.textContent = energy;
    balance++;
    balanceAmount.textContent = balance;
    updateLeague();
  } else {
    isRecovering = true; // Начинаем восстановление, если энергия закончилась
  }
});

// Восстановление энергии
setInterval(() => {
  if (isRecovering && energy < 100) {
    energy++;
    energyAmount.textContent = energy;
    progressBarFill.style.width = '${energy}%'; 

    if (energy === 100) {
      isRecovering = false;
    }
  }
}, 1000); 

function openLeagueModal() {
  leagueModal.style.display = 'block';
  currentLeagueIndex = leagues.indexOf(levelName); 
  updateLeagueModalContent();
}

closeModal.addEventListener('click', () => {
  leagueModal.style.display = 'none';
});

window.onclick = function(event) {
  if (event.target == leagueModal) {
    leagueModal.style.display = 'none';
  }
}

prevLeagueButton.addEventListener('click', () => {
  currentLeagueIndex = Math.max(0, currentLeagueIndex - 1);
  updateLeagueModalContent();
});

nextLeagueButton.addEventListener('click', () => {
  currentLeagueIndex = Math.min(leagues.length - 1, currentLeagueIndex + 1);
  updateLeagueModalContent();
});

function updateLeague() {
  let currentLeagueIndex = leagues.indexOf(levelName);
  let requiredCoins = leagues[currentLeagueIndex].requiredCoins;

  if (balance >= requiredCoins && currentLeagueIndex < leagues.length - 1) {
    currentLeagueIndex++;
    levelName = leagues[currentLeagueIndex].name;
    levelNameSpan.textContent = levelName;
    updateLeagueModalContent();
  }
}

function updateLeagueModalContent() {
  const currentLeague = leagues[currentLeagueIndex];
  modalLeagueName.textContent = currentLeague.name;
  leagueImage.src = currentLeague.image; 
  requiredCoinsSpan.textContent = currentLeague.requiredCoins.toLocaleString();
  updateLeagueProgress();
}

function updateLeagueProgress() {
  const currentLeague = leagues[currentLeagueIndex];
  let progressPercent = Math.min(100, (balance / currentLeague.requiredCoins) * 100);

  progressBarFill.style.width = '${progressPercent}%';
  requiredCoinsSpan.textContent = currentLeague.requiredCoins.toLocaleString(); 
}

Telegram.WebApp.ready();