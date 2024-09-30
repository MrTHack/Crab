const crabMain = document.getElementById('crab-main');
const balanceAmount = document.getElementById('balance-amount');
const energyAmount = document.getElementById('energy-amount');
const progressBarFill = document.querySelector('.progress-bar-fill');
const levelNameSpan = document.getElementById('level-name');

let balance = 0;
let energy = 100;
let currentLeagueIndex = 0; 
let isRecovering = false;

const leagues = [
  { name: 'Bronze', image: 'crab-league-bronze.png', requiredCoins: 100000 },
  { name: 'Silver', image: 'crab-league-silver.png', requiredCoins: 1000000 },
  { name: 'Gold', image: 'crab-league-gold.png', requiredCoins: 10000000 },
  { name: 'Diamond', image: 'crab-league-diamond.png', requiredCoins: 100000000 }
];

levelNameSpan.addEventListener('click', openLeagueModal);

crabMain.addEventListener('click', () => {
  if (energy > 0) {
    energy--;
    energyAmount.textContent = energy;
    balance++;
    balanceAmount.textContent = balance;
    updateLeague();
  } else {
    isRecovering = true;
  }
});

// Восстановление энергии
setInterval(() => {
  if (isRecovering && energy < 100) {
    energy++;
    energyAmount.textContent = energy;
    progressBarFill.style.width = `${energy}%`; 

    if (energy === 100) {
      isRecovering = false;
    }
  }
}, 1000);

function openLeagueModal() {
  // ---  Скрываем главный экран ---
  const mainScreen = document.getElementById('main-screen');
  mainScreen.style.display = 'none';
  // --- ---

  // ---  Получаем элементы модального окна ---
  const modal = document.getElementById('league-modal');
  const backButton = modal.querySelector('#back-to-main');
  const modalLeagueName = modal.querySelector('#modal-league-name');
  const currentCoinsSpan = modal.querySelector('#current-coins');
  const requiredCoinsSpan = modal.querySelector('#required-coins');
  const prevLeagueButton = modal.querySelector('#prev-league');
  const nextLeagueButton = modal.querySelector('#next-league');
  const leagueImage = modal.querySelector('.league-crab-image img');
  // --- ---

  // ---  Устанавливаем начальные значения ---
  modalLeagueName.textContent = leagues[currentLeagueIndex].name;
  leagueImage.src = leagues[currentLeagueIndex].image;
  // ---  Проверка на текущую лигу для установки начального значения счётчика монет ---
  if (currentLeagueIndex === 0) {
    currentCoinsSpan.textContent = balance; 
  } else {
    currentCoinsSpan.textContent = 0; 
  }
  // --- ---
  requiredCoinsSpan.textContent = leagues[currentLeagueIndex].requiredCoins;
  // --- ---

  // ---  Отображаем модальное окно ---
  modal.style.display = 'block'; 
  // --- ---

  // ---  Обновляем содержимое модального окна ---
  updateLeagueModalContent(modal); 
  // --- ---

  backButton.onclick = function() {
    mainScreen.style.display = 'block'; 
    modal.style.display = 'none'; 
    currentLeagueIndex = 0; 
  }

  prevLeagueButton.addEventListener('click', () => {
    currentLeagueIndex = Math.max(0, currentLeagueIndex - 1);
    updateLeagueModalContent(modal); 
  });

  nextLeagueButton.addEventListener('click', () => {
    currentLeagueIndex = Math.min(leagues.length - 1, currentLeagueIndex + 1);
    updateLeagueModalContent(modal);
  });
}

function updateLeague() {
  let currentLeague = leagues[currentLeagueIndex];
  let requiredCoins = currentLeague.requiredCoins;

  if (balance >= requiredCoins && currentLeagueIndex < leagues.length - 1) {
    currentLeagueIndex++;
    levelNameSpan.textContent = leagues[currentLeagueIndex].name;
  }

  updateLeagueProgress();
}

function updateLeagueModalContent(modal) {
  const modalLeagueName = modal.querySelector('#modal-league-name');
  const leagueImage = modal.querySelector('.league-crab-image img');
  const requiredCoinsSpan = modal.querySelector('#required-coins');
  const currentCoinsSpan = modal.querySelector('#current-coins');
  const progressBarFill = modal.querySelector('.progress-bar-fill');

  modalLeagueName.textContent = leagues[currentLeagueIndex].name;
  leagueImage.src = leagues[currentLeagueIndex].image;
  requiredCoinsSpan.textContent = leagues[currentLeagueIndex].requiredCoins;
  // ---  Проверка на текущую лигу для обновления счётчика монет ---
  if (currentLeagueIndex === 0) {
    currentCoinsSpan.textContent = balance; 
  } else {
    currentCoinsSpan.textContent = 0; 
  }
  // --- ---

  progressBarFill.style.width = `${(balance / leagues[currentLeagueIndex].requiredCoins) * 100}%`; 
}

function updateLeagueProgress() {
  let currentLeague = leagues[currentLeagueIndex];
  let progressPercent = Math.min(100, (balance / currentLeague.requiredCoins) * 100);
  progressBarFill.style.width = `${progressPercent}%`;
}

Telegram.WebApp.ready();
