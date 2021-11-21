import { StyleSheet } from 'react-native';
import { border, colors, dimensions, fontsFamily } from '../../styles';
import fontSizes from '../../styles/fontSizes';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    paddingTop: dimensions.spacingStackXxl16,
    backgroundColor: colors.light.neutralColor14,
  },
  content: {    
    paddingTop: dimensions.spacingStackXxl16,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: dimensions.spacingInlineSm16,
    justifyContent: AlignTypes.SPACE_BETWEEN,
  },
  logo: {
    width: dimensions.height80,
    height: dimensions.height40,
    borderRadius: dimensions.spacingStackXxs7,
    backgroundColor: colors.light.neutralColor12,

    shadowColor: colors.light.neutralColor0,
    shadowOffset: {
      width: dimensions.spacingStackXxxs6,
      height: dimensions.spacingStackQuarck4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: dimensions.spacingInlineXxxs9,
  },
  buttons: {
    flexDirection: 'row',
  },
  profileInfo: {
    marginTop: dimensions.spacingStackXxl16,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  avatar: {
    height: dimensions.height100,
    width: dimensions.width100,
  },
  images: {
    height: dimensions.height100,
    width: dimensions.width100,
    borderRadius: border.radius.xb50,
  },
  changePhoto: {
    backgroundColor: colors.light.neutralColor14,
    width: 34,
    height: 34,
    borderRadius: 15,
    position: 'absolute',
    right: -14,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER
  },
  camera: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    width: 26,
    height: 26,
    borderRadius: 12,
    backgroundColor: '#c6c6c6'
  },
  username: {
    marginTop: dimensions.spacingStackLg10,
    flexDirection: 'row',
  },
  userNameText: {
    color: colors.light.neutralColor4,
    fontSize: fontSizes.xl20,
    fontFamily: fontsFamily.montserrat.medium500,
  },
  hash: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 230,
  },
  userbio: {
    marginTop: dimensions.spacingStackXxl16,
    marginBottom: dimensions.spacingStackXHuge40,
    flexDirection: 'row',
    paddingHorizontal: dimensions.spacingInlineSm16,
  },
  bioDescription: {
    color: colors.light.neutralColor7,
    fontSize: fontSizes.xs12,
    fontFamily: fontsFamily.montserrat.medium500,
    textAlign: AlignTypes.CENTER
  },
  editDescription: {
    marginLeft: dimensions.spacingStackLg10,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  arts: {
    flexDirection: 'row',
    width: dimensions.widthFull,
  },
  image: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    paddingHorizontal: dimensions.spacingInlineSm16,
  },
  body: {
    width: dimensions.widthFull,
    marginTop: dimensions.spacingStackXGiant30,
    paddingBottom: 80, // todo: create 80 stack
    marginBottom: dimensions.height80,
  },
  description: {
    marginTop: 40,
    marginBottom: 20,
  },
  nftsImages: {
    width: dimensions.widthFull,
    flexWrap: 'wrap',
    flexDirection: 'row',
  }
}) 