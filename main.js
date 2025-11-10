// 問題データにヒントを追加
const problems = [
    { 
        question: "変数 'message' に 'Hello, World!' という文字列を代入し、コンソールに出力してください。", 
        answer: "const message = 'Hello, World!';\nconsole.log(message);",
        hint: "変数の宣言は 'const' や 'let' を使います。出力は 'console.log()' ですよ。" 
    },
    { 
        question: "変数 'a' が 10 より大きい場合に 'OK' とコンソールに出力する if文を書いてください。", 
        answer: "const a = 15;\nif (a > 10) {\n  console.log('OK');\n}",
        hint: "条件分岐には 'if (条件式) { 実行コード }' の形を使います。比較演算子は '>' です。"
    },
    {
        question: "1から5までの数字をコンソールに出力する forループを書いてください。",
        answer: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
        hint: "forループは 'for (初期値; 条件式; 変化式)' の形式です。条件式は 'i <= 5' になります。"
    }
];

let currentProblemIndex = 0;
let incorrectAttempts = 0; // 不正解の回数をリセット

const questionElement = document.getElementById('question');
const userCodeElement = document.getElementById('user-code');
const resultElement = document.getElementById('result');
const checkButton = document.getElementById('check-button');
const hintArea = document.createElement('p'); // 新しいヒント表示用の要素を作成
hintArea.id = 'hint-display';
document.getElementById('problem-area').after(hintArea); // 問題エリアの下に追加

// --- 1. 問題の読み込みと表示 ---
function loadProblem() {
    if (currentProblemIndex >= problems.length) {
        // すべての問題が完了した場合
        questionElement.textContent = "🎉 すべての問題を完了しました！お疲れ様でした。";
        userCodeElement.style.display = 'none'; // 入力欄を非表示
        checkButton.style.display = 'none';    // ボタンを非表示
        resultElement.textContent = '';
        hintArea.textContent = '';
        return;
    }

    const problem = problems[currentProblemIndex];
    questionElement.textContent = problem.question;
    userCodeElement.value = ''; // 入力欄をクリア
    resultElement.textContent = '';
    resultElement.classList.remove('correct', 'incorrect');
    hintArea.textContent = ''; // ヒントをクリア
    incorrectAttempts = 0; // 不正解の回数をリセット
}

// --- 2. 正誤判定と次の問題への遷移 ---
function checkCode() {
    const problem = problems[currentProblemIndex];
    const userInput = userCodeElement.value.trim();
    const expectedAnswer = problem.answer.trim();
    
    // シンプルな文字列比較 (スペース、改行などを詰めて比較)
    const isCorrect = userInput.replace(/\s+/g, '') === expectedAnswer.replace(/\s+/g, '');

    resultElement.classList.remove('correct', 'incorrect');

    if (isCorrect) {
        // ✅ 正解の場合のロジック
        resultElement.textContent = '✅ 正解です！次の問題へ進みましょう。';
        resultElement.classList.add('correct');
        
        // 3秒後に次の問題をロード
        setTimeout(() => {
            currentProblemIndex++;
            loadProblem();
        }, 3000); 

    } else {
        // ❌ 不正解の場合のロジック
        incorrectAttempts++; // 不正解回数をカウントアップ
        resultElement.textContent = '❌ 不正解です。もう一度確認しましょう。';
        resultElement.classList.add('incorrect');

        // 1回以上不正解ならヒントを表示
        if (incorrectAttempts >= 1 && problem.hint) {
            hintArea.innerHTML = `<span style="font-weight: bold; color: #e67e22;">💡 ヒント:</span> ${problem.hint}`;
        }
    }
}

// --- 3. イベントリスナー ---
document.addEventListener('DOMContentLoaded', () => {
    loadProblem();
    checkButton.addEventListener('click', checkCode);
});
