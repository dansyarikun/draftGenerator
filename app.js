// 入力項目をランダムに振り分ける関数
function generateGroups() {
    const inputText = document.getElementById("input-items").value;
    const groupCount = parseInt(document.getElementById("group-count").value);

    // 改行で項目を分割して配列に変換
    let items = inputText.split('\n').filter(item => item.trim() !== '');
    
    // グループを作成
    let groups = Array.from({ length: groupCount }, () => []);
    
    // ランダムにグループに振り分ける
    while (items.length) {
        for (let i = 0; i < groupCount && items.length; i++) {
            const randomIndex = Math.floor(Math.random() * items.length);
            groups[i].push(items.splice(randomIndex, 1)[0]);
        }
    }

    //本番では結果表示は無効にする
    // 結果を表示
    let output = '';
    groups.forEach((group, index) => {
        output += group.join('\n') + '\n\n';
    });
    document.getElementById("output").textContent = output;

     // グループごとに.txtファイルを生成
     generateFiles(groups);
}

// グループごとにファイルを生成しダウンロードリンクを表示
function generateFiles(groups) {
    const fileContainer = document.getElementById("file-links");
    fileContainer.innerHTML = ''; // 既存のリンクをクリア

    groups.forEach((group, index) => {
        const groupText = `グループ ${index + 1}:\n` + group.join('\n');
        const blob = new Blob([groupText], { type: 'text/plain' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `group_${index + 1}.txt`;
        link.textContent = `グループ ${index + 1} のファイルをダウンロード`;
        fileContainer.appendChild(link);
        fileContainer.appendChild(document.createElement("br")); // 改行
    });
}
