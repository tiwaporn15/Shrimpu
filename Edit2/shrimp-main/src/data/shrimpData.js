export const SHRIMP_DATA = {
  white_shrimp: {
    image: require('../../assets/images/shrimp-icon.png'), // เปลี่ยน path ตามภาพจริง
    nameKey: 'shrimps.white',
    description: {
      th: `กุ้งขาว เป็นกุ้งที่พบตามตลาดได้บ่อยๆ...`,
      en: `Whiteleg shrimp (White shrimp) are commonly found in local markets...`,
    },
    nutrition: [
      { label: 'Calories', value: '102 Kcal' },
      { label: 'Cholesterol', value: '150 mg' },
      { label: 'Fat', value: '2 g' },
      { label: 'Protein', value: '20 g' },
      { label: 'Carbohydrates', value: '1 g' },
      { label: 'Sodium', value: '150 mg' },
    ],
    prices: [
      { retailer: 'Lotus', price: '359', unit: '/kg', logo: require('../../assets/images/raw_shrimp_no_bg.png'), size: 'CP แพ็ค PM' },
      { retailer: 'Makro', price: '339', unit: '/kg', logo: require('../../assets/images/raw_shrimp_no_bg.png'), size: 'กุ้งขาววังปัน' },
      // เพิ่มได้ตามต้องการ
    ],
  },

  banana_shrimp: {
    image: require('../../assets/images/shrimp-icon.png'),
    nameKey: 'shrimps.banana',
    description: {
      th: `กุ้งแชบ๊วย เป็นกุ้งทะเล...`,
      en: `Banana shrimp are marine shrimp...`,
    },
    nutrition: [
      { label: 'Calories', value: '99 Kcal' },
      { label: 'Cholesterol', value: '189 mg' },
      { label: 'Fat', value: '0.3 g' },
      { label: 'Protein', value: '24 g' },
      { label: 'Carbohydrates', value: '0.2 g' },
      { label: 'Sodium', value: '111 mg' },
    ],
    prices: [
      { retailer: 'Lotus', price: '359', unit: '/kg', logo: require('../../assets/images/ha_gow_no_bg.png'), size: 'แชบ๊วยสด' },
      { retailer: 'Makro', price: '599', unit: '/kg', logo: require('../../assets/images/ha_gow_no_bg.png'), size: 'แชบ๊วยใหญ่' },
    ],
  },

  tiger_shrimp: {
    image: require('../../assets/images/shrimp-icon.png'),
    nameKey: 'shrimps.tiger',
    description: {
      th: `กุ้งลายเสือ หรือ กุ้งกุลาดำ เป็นธรรมชาติ...`,
      en: `Black tiger shrimp are naturally found in brackish and seawater...`,
    },
    nutrition: [
      { label: 'Calories', value: '92 Kcal' },
      { label: 'Cholesterol', value: '175 mg' },
      { label: 'Fat', value: '1.3 g' },
      { label: 'Protein', value: '20.1 g' },
      { label: 'Carbohydrates', value: '0 g' },
      { label: 'Sodium', value: 'N/A' },
    ],
    prices: [
      { retailer: 'Lotus', price: '249', unit: '/kg', logo: require('../../assets/images/crispy_shrimp_no_bg.png'), size: 'ลายเสือสด' },
      { retailer: 'Makro', price: '1,150', unit: '/kg', logo: require('../../assets/images/crispy_shrimp_no_bg.png'), size: 'ลายเสือกลาง' },
    ],
  },
};
