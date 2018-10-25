const CATEGORY = {
  実行力の強み: [
    'アレンジ',
    '回復志向',
    '信念',
    '規律性',
    '慎重さ',
    '責任感',
    '達成欲',
    '目標志向',
    '公平性'
  ],
  影響力の強み: [
    '活発性',
    '競争性',
    'コミュニケーション',
    '最上志向',
    '自我',
    '自己確信',
    '社交性',
    '指令性'
  ],
  人間関係構築力の強み: [
    '運命思考',
    '共感性',
    '個別化',
    '親密性',
    '成長促進',
    '調和性',
    '適応性',
    '包含',
    'ポジティブ'
  ],
  戦略的思考力の強み: [
    '着想',
    '原点思考',
    '内省',
    '未来志向',
    '学習欲',
    '戦略性',
    '収集心',
    '分析思考'
  ]
}
const CATEGORY_COLORS = {
  実行力の強み: '#f6d5e0',
  影響力の強み: '#feedd1',
  人間関係構築力の強み: '#e2eeda',
  戦略的思考力の強み: '#d7e5ff'
}

export const getters = {
  strValues: state => {
    return Object.keys(CATEGORY).map(key => CATEGORY[key])
  },
  strFlatValues: state => {
    return Object.keys(CATEGORY)
      .map(key => CATEGORY[key])
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      )
  }
}
