// 능력치 객체
let stats = {
  exploration: 1,
  persuasion: 1,
  hacking: 1,
  combat: 1
};

let endingFlag = null; // 엔딩 분기용 플래그
let hiddenFlag = false; // 숨겨진 엔딩 조건

const storyData = [
  {
    text: `당신은 변신 능력을 가진 외계 종족 시투라의 첩자입니다.\n지구 대도시의 연구소에 인간 연구원으로 위장해 잠입 중입니다.\n오늘, 연구소에 외계 신호 해독 성공이라는 비상 경보가 울립니다.\n\n어떻게 행동하시겠습니까?`,
    choices: [
      { text: '회의실에 참석해 정보를 수집한다.', next: 1 },
      { text: '텔레파시로 연구소장의 생각을 엿본다.', next: 2 },
      { text: '외계 기술로 컴퓨터를 해킹한다.', next: 3 },
      { text: '연구소를 빠져나와 상부에 보고한다.', next: 4 }
    ]
  },
  {
    text: `당신은 인간 연구원인 척 회의실에 들어가,\n군 요원들과 연구소장, 동료 연구원들의 대화를 엿듣습니다.\n외계 신호의 좌표와 해독 내용이 곧 공개될 예정입니다.`,
    choices: [
      { text: '좌표가 공개되기 전, 컴퓨터를 해킹한다.', next: 3 },
      { text: '연구소장에게 접근해 신뢰를 얻는다.', next: 5 },
      { text: '상부에 정보를 텔레파시로 보고한다.', next: 4 }
    ]
  },
  {
    text: `텔레파시로 연구소장의 생각을 엿보니,\n외계 신호에는 경고와 좌표가 담겨 있고, 군이 이를 무기로 삼으려 한다는 사실을 알게 됩니다.\n또한 연구소장은 내부에 외계인이 숨어 있을까 경계하고 있습니다.`,
    choices: [
      { text: '컴퓨터를 해킹해 신호 좌표를 빼낸다.', next: 3, stat: 'hacking' },
      { text: '상부에 정보를 텔레파시로 보고한다.', next: 4 },
      { text: '연구소장에게 접근해 신뢰를 얻는다.', next: 5, stat: 'persuasion' }
    ]
  },
  {
    text: `외계 기술을 사용해 연구소 컴퓨터에 몰래 접속합니다.\n신호의 좌표와 해독된 내용을 확보했습니다!\n군 정보기관이 곧 탐사대를 파견할 계획임을 알게 됩니다.`,
    choices: [
      { text: '상부에 정보를 텔레파시로 보고한다.', next: 4 },
      { text: '연구소장에게 접근해 신뢰를 얻는다.', next: 5, stat: 'persuasion' }
    ]
  },
  {
    text: `상부(외계 본부)에 인간들의 계획과 신호 좌표를 보고합니다.\n상부는 “관찰을 계속하고, 필요시 인간 사회에 개입하라”는 명령을 내립니다.`,
    choices: [
      { text: '연구소장에게 접근해 신뢰를 얻는다.', next: 5, stat: 'persuasion' },
      { text: '연구소를 몰래 빠져나온다.', next: 6, stat: 'exploration', ending: 'alien_alliance' }
    ]
  },
  {
    text: `연구소장에게 접근해 신뢰를 얻으려 합니다.\n연구소장은 당신을 유심히 바라보며, “외계 신호에 대해 어떻게 생각하나?”라고 묻습니다.`,
    choices: [
      { text: '“평화적 교류의 신호일 수 있습니다.”', next: 10, stat: 'persuasion', ending: 'peace' },
      { text: '“위험하니 봉인해야 합니다.”', next: 11, stat: 'exploration', ending: 'betray' },
      { text: '“인류의 발전에 쓸 기회입니다.”', next: 12, stat: 'hacking', ending: 'war' }
    ]
  },
  {
    text: `당신은 연구소를 빠져나와 인간 사회를 관찰하며,\n외계 본부의 추가 명령을 기다립니다.\n(게임 종료: 외계인 동맹 엔딩)`,
    choices: []
  },
  // 엔딩 분기점(7~9 기존 엔딩)
  {
    text: `연구소장은 고개를 끄덕이며 당신을 신뢰합니다.\n곧 탐사대에 합류해 외계 신호의 좌표로 향하게 됩니다.\n(새로운 모험이 시작됩니다!)`,
    choices: []
  },
  {
    text: `연구소장은 신호를 봉인하기로 결정합니다.\n인류는 외계와의 접촉을 피하고, 당신의 정체도 들키지 않습니다.\n(게임 종료: 평화적 봉인)`,
    choices: []
  },
  {
    text: `연구소장은 당신의 야심을 눈치채고 경계합니다.\n곧 내부 조사가 시작되고, 당신의 정체가 위태로워집니다.\n(게임 종료: 잠입 실패)`,
    choices: []
  },
  // 평화 엔딩
  {
    text: `평화 엔딩: 당신은 인류와 외계 문명 사이의 평화적 교류를 이끌어냈다!\n능력치: 설득력 ${stats.persuasion}, 탐사력 ${stats.exploration}, 해킹력 ${stats.hacking}, 전투력 ${stats.combat}`,
    choices: []
  },
  // 배신 엔딩
  {
    text: `배신 엔딩: 당신은 인간과 외계인 모두를 속이고, 혼자만의 이익을 위해 움직였다.\n능력치: 설득력 ${stats.persuasion}, 탐사력 ${stats.exploration}, 해킹력 ${stats.hacking}, 전투력 ${stats.combat}`,
    choices: []
  },
  // 전쟁 엔딩
  {
    text: `전쟁 엔딩: 당신의 선택으로 인류와 외계 문명 사이에 전쟁이 발발했다!\n능력치: 설득력 ${stats.persuasion}, 탐사력 ${stats.exploration}, 해킹력 ${stats.hacking}, 전투력 ${stats.combat}`,
    choices: []
  },
  // 숨겨진 엔딩 (특정 조건)
  {
    text: `숨겨진 엔딩: 당신은 모든 진실을 밝혀내고, 우주적 균형의 수호자가 되었다!\n능력치: 설득력 ${stats.persuasion}, 탐사력 ${stats.exploration}, 해킹력 ${stats.hacking}, 전투력 ${stats.combat}`,
    choices: []
  }
];

let current = 0;

function renderStats() {
  document.getElementById('stats').textContent =
    `탐사력: ${stats.exploration}  설득력: ${stats.persuasion}  해킹력: ${stats.hacking}  전투력: ${stats.combat}`;
}

function checkEnding(choice) {
  // 숨겨진 엔딩 조건 예시: 해킹력 3 이상, 설득력 2 이상, exploration 2 이상
  if (stats.hacking >= 3 && stats.persuasion >= 2 && stats.exploration >= 2) {
    current = 15; // 숨겨진 엔딩
    render();
    return true;
  }
  // 평화 엔딩
  if (choice && choice.ending === 'peace' && stats.persuasion >= 3) {
    current = 13;
    render();
    return true;
  }
  // 배신 엔딩
  if (choice && choice.ending === 'betray' && stats.exploration >= 3) {
    current = 14;
    render();
    return true;
  }
  // 전쟁 엔딩
  if (choice && choice.ending === 'war' && stats.hacking >= 3) {
    current = 15;
    render();
    return true;
  }
  // 외계인 동맹 엔딩
  if (choice && choice.ending === 'alien_alliance' && stats.exploration >= 2) {
    current = 6;
    render();
    return true;
  }
  return false;
}

function render() {
  renderStats();
  const story = document.getElementById('story');
  const choices = document.getElementById('choices');
  story.textContent = storyData[current].text;
  choices.innerHTML = '';
  storyData[current].choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.className = 'choice-btn';
    btn.onclick = () => {
      // 선택에 stat 속성이 있으면 해당 능력치 +1
      if (choice.stat) stats[choice.stat]++;
      // 엔딩 분기 체크
      if (!checkEnding(choice)) {
        current = choice.next;
        render();
      }
    };
    choices.appendChild(btn);
  });
}

window.onload = render;
