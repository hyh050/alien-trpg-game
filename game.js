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
      { text: '컴퓨터를 해킹해 신호 좌표를 빼낸다.', next: 3 },
      { text: '상부에 정보를 텔레파시로 보고한다.', next: 4 },
      { text: '연구소장에게 접근해 신뢰를 얻는다.', next: 5 }
    ]
  },
  {
    text: `외계 기술을 사용해 연구소 컴퓨터에 몰래 접속합니다.\n신호의 좌표와 해독된 내용을 확보했습니다!\n군 정보기관이 곧 탐사대를 파견할 계획임을 알게 됩니다.`,
    choices: [
      { text: '상부에 정보를 텔레파시로 보고한다.', next: 4 },
      { text: '연구소장에게 접근해 신뢰를 얻는다.', next: 5 }
    ]
  },
  {
    text: `상부(외계 본부)에 인간들의 계획과 신호 좌표를 보고합니다.\n상부는 “관찰을 계속하고, 필요시 인간 사회에 개입하라”는 명령을 내립니다.`,
    choices: [
      { text: '연구소장에게 접근해 신뢰를 얻는다.', next: 5 },
      { text: '연구소를 몰래 빠져나온다.', next: 6 }
    ]
  },
  {
    text: `연구소장에게 접근해 신뢰를 얻으려 합니다.\n연구소장은 당신을 유심히 바라보며, “외계 신호에 대해 어떻게 생각하나?”라고 묻습니다.`,
    choices: [
      { text: '“평화적 교류의 신호일 수 있습니다.”', next: 7 },
      { text: '“위험하니 봉인해야 합니다.”', next: 8 },
      { text: '“인류의 발전에 쓸 기회입니다.”', next: 9 }
    ]
  },
  {
    text: `당신은 연구소를 빠져나와 인간 사회를 관찰하며,\n외계 본부의 추가 명령을 기다립니다.\n(게임 종료: 잠입 임무 유지)`,
    choices: []
  },
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
  }
];

let current = 0;

function render() {
  const story = document.getElementById('story');
  const choices = document.getElementById('choices');
  story.textContent = storyData[current].text;
  choices.innerHTML = '';
  storyData[current].choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.className = 'choice-btn';
    btn.onclick = () => {
      current = choice.next;
      render();
    };
    choices.appendChild(btn);
  });
}

window.onload = render;
