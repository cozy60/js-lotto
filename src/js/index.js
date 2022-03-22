import {
	$lottoForm,
	$lottoFormInput,
	$lottoResult,
	$lottoNumber,
	$toggle,
	$lottoPurchases,
	$lottoNumberResult,
} from './util/dom.js';

const lottoMaker = () => {
	const lotto = [];

	for (let i = 0; i < 6; i += 1) {
		const num = Math.floor(Math.random() * 45) + 1;

		if (lotto.indexOf(num) < 0) {
			lotto.push(num);
		}
	}

	return lotto;
};

$lottoForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const price = $lottoFormInput.value;
	if (price % 1000 !== 0) {
		alert('값은 1,000단위로 입력 가능합니다.');
		return;
	}

	const numberPurchases = price / 1000;
	const lottoList = [];

	$lottoResult.style.display = 'block';
	$lottoNumber.style.display = 'block';

	for (let i = 0; i < numberPurchases; i += 1) {
		lottoList.push({ icon: '🎟️', number: lottoMaker() });
	}

	$lottoPurchases.innerText = `총 ${numberPurchases}개를 구매하였습니다.`;

	const template = lottoList
		.map(
			(
				lotto
			) => `<li class="mx-1 text-4xl lotto-wrapper"><span class="lotto-icon">${lotto.icon} </span>
			<span class="lotto-detail" style="display: none;">${lotto.number}</span></li>`
		)
		.join('');
	$lottoNumberResult.innerHTML = template;
});

let hide = true;
$toggle.addEventListener('click', (e) => {
	hide = !hide;
	const lottoNumberResult = document.querySelectorAll('.lotto-detail');
	Array.from(lottoNumberResult).map(
		(item) => (item.style.display = hide ? 'none' : 'block')
	);
});
