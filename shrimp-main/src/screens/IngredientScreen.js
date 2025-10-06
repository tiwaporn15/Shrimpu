import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Share, Dimensions } from 'react-native';
import { useThemeX } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { RECIPES } from '../data/recipes';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function IngredientScreen({ route, navigation }) {
  const { id = 'crispy' } = route.params || {};
  const { colors } = useThemeX();
  const { lang } = useLang();
  const r = RECIPES[id];
  const t = r[lang] || r.th;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${t.title}\n\n${t.ingTitle}:\n${t.ingredients.map(([name, amount]) => `- ${name} (${amount})`).join('\n')}\n\n${t.insTitle}:\n${t.steps.map((s, i) => `${i+1}. ${s}`).join('\n')}`
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 90, backgroundColor: '#ffffffff' }}>

      

      {/* Polaroid style image */}
      <View style={styles.polaroidWrap}>
        <Image source={r.cover} style={styles.polaroidImg} />
        <Text style={styles.polaroidTitle}>{t.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t.ingTitle}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHead]}>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Ingredients</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Quantity</Text>
          </View>
          {t.ingredients.map(([name, amount], i) => (
            <View key={i} style={[styles.tableRow, i % 2 !== 0 && styles.tableRowAlt]}>
              <Text style={styles.tableCell}>{name}</Text>
              <Text style={styles.tableCell}>{amount}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t.insTitle}</Text>
        <View style={styles.instructionsBox}>
          {t.steps.map((s, i) => (
            <Text key={i} style={styles.instructionStep}>
              <Text style={styles.stepIndex}>{i + 1}. </Text>{s}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  },
  rightBtns: {
    flexDirection: 'row',
    gap: 10
  },
  iconBtn: {
    paddingHorizontal: 6
  },
  polaroidWrap: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fcfafaff',
    paddingBottom: 12,
    borderRadius: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16
  },
  polaroidImg: {
    width: width * 0.85,
    height: 200,
    marginTop: 12,
    
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    resizeMode: 'cover'
  },
  polaroidTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#c44b2a',
    marginBottom: 8
  },
  table: {
    borderWidth: 1,
    borderColor: '#c44b2a',
    borderRadius: 8,
    overflow: 'hidden'
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between'
  },
  tableRowAlt: {
    backgroundColor: '#f5f5f5'
  },
  tableCell: {
    flex: 1,
    fontSize: 14
  },
  tableHeaderCell: {
    fontWeight: '700'
  },
  tableHead: {
    backgroundColor: '#ffe7de'
  },
  instructionsBox: {
    borderWidth: 1,
    borderColor: '#c44b2a',
    borderRadius: 8,
    padding: 12
  },
  instructionStep: {
    fontSize: 14,
    marginBottom: 6
  },
  stepIndex: {
    fontWeight: '700',
    color: '#c44b2a'
  }
});
