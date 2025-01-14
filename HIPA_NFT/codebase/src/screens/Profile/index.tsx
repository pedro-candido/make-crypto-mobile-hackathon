import React, { useState, useRef, useEffect, useCallback } from 'react';

import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { styles } from './styles';

import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';

import HipaLogoSVG from '../../../assets/hipa-logo.svg';
import HIPASVG from '../../../assets/HIPA.svg';

import { LineButton, ProfileButton, SquareButton, Text } from '@nft/components';

import { colors, fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import NftImage from '@nft/components/NftImage';

import * as ImagePicker from 'expo-image-picker';

import * as Clipboard from 'expo-clipboard';

import MenuSvg from '../../../assets/menu.svg';
import CamSvg from '../../../assets/cam.svg';
import PencilSvg from '../../../assets/pencil.svg';
import Copy from '../../../assets/copy.svg';
import EmptyCreationsSvg from '../../../assets/empty-creations.svg';
import EmptyPurchasesSvg from '../../../assets/empty-purchases.svg';
import EmptyProfileSvg from '../../../assets/empty-profile.svg';
import Magnifier from '../../../assets/magnifier.svg';
import { useAuth } from '@nft/context/auth';
import ConnectWallet from '../ConnectWallet';
import { useModal } from '@nft/context/modal.context';
import { useFocusEffect } from '@react-navigation/native';

type PurchaseProps = {
  id: number;
  uri: string;
};

type CreationProps = {
  id: number;
  uri: string;
};

const Profile = (): JSX.Element => {
  const creationsImg = [
    {
      id: 1,
      uri: 'https://images.pexels.com/photos/3713892/pexels-photo-3713892.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 2,
      uri: 'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 3,
      uri: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 4,
      uri: 'https://images.pexels.com/photos/695266/pexels-photo-695266.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 5,
      uri: 'https://images.pexels.com/photos/695266/pexels-photo-695266.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
  ];

  const [creationsButtonSelected, setCreationsButtonSelected] = useState(true);
  const [creations, setCreations] = useState<CreationProps[]>([]);
  const [purchases, setPurchases] = useState<PurchaseProps[]>([]);
  const [image, setImage] = useState('');

  const [name, setName] = useState('');
  const [hash, setHash] = useState('');
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [newNameValue, setNewNameValue] = useState(name);
  const nameTextInputRef = useRef<TextInput>(null);

  const [description, setDescription] = useState('');
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [newDescriptionValue, setNewDescriptionValue] = useState(description);
  const descriptionTextInputRef = useRef<TextInput>(null);

  const handleStartEditingDescription = () => {
    setIsDescriptionEditing(true);
  };

  const handleSubmitEditingDescription = () => {
    setDescription(newDescriptionValue);
    setIsDescriptionEditing(false);
  };

  const { user } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    if (descriptionTextInputRef.current) {
      if (isDescriptionEditing) {
        descriptionTextInputRef.current.focus();
      } else {
        descriptionTextInputRef.current.blur();
      }
    }
  }, [isDescriptionEditing]);

  const handleStartEditingName = () => {
    setIsNameEditing(true);
  };

  const handleSubmitEditingName = () => {
    setName(newNameValue);
    setIsNameEditing(false);
  };

  useEffect(() => {
    if (nameTextInputRef.current) {
      if (isNameEditing) {
        nameTextInputRef.current.focus();
      } else {
        nameTextInputRef.current.blur();
      }
    }
  }, [isNameEditing]);

  const handleSelect = () => {
    setCreationsButtonSelected((oldValue) => !oldValue);
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss;
    Keyboard.addListener('keyboardDidHide', () => {
      setIsDescriptionEditing(false);
      setIsNameEditing(false);
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(hash);
  };

  useEffect(() => {
    //todo loadApi imags
    setCreations(creationsImg);
    setNewNameValue(user.name);
    setNewDescriptionValue(user.description);
    setHash(user.address);
    setImage(user.profilePicture);
    //todo setPurchases
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!user.id) {
        openModal();
      }
    }, []),
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      //chamada da api
    }
  };

  return (
    <>
      {user.id ? (
        <TouchableOpacity onPress={handleDismissKeyboard} activeOpacity={1.0}>
          <View style={styles.overlay}>
            <SafeAreaView style={styles.container}>
              <View style={styles.content}>
                <View style={styles.header}>
                  <View style={styles.logo}>
                    <HipaLogoSVG />
                    <View style={styles.divider} />
                    <HIPASVG />
                  </View>
                  <View style={styles.buttons}>
                    <SquareButton iconChildren={MenuSvg} />
                  </View>
                </View>
                <View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollview}>
                    <TouchableOpacity
                      style={styles.touchableOpacityContainer}
                      activeOpacity={1}
                      onPress={handleDismissKeyboard}>
                      <View style={styles.contentView}>
                        <View style={styles.profileInfo}>
                          <View style={styles.avatar}>
                            <Image
                              source={{
                                uri: image,
                              }}
                              style={styles.images}
                            />
                            <View style={styles.changePhoto}>
                              <BorderlessButton style={styles.camera} onPress={pickImage}>
                                <CamSvg />
                              </BorderlessButton>
                            </View>
                          </View>

                          <View style={styles.username}>
                            <TextInput
                              style={styles.userNameText}
                              value={newNameValue}
                              onChangeText={setNewNameValue}
                              editable={isNameEditing}
                              onSubmitEditing={handleSubmitEditingName}
                              ref={nameTextInputRef}
                              spellCheck={false}
                            />
                            <BorderlessButton
                              onPress={
                                !isNameEditing ? handleStartEditingName : handleSubmitEditingName
                              }
                              style={styles.editDescription}>
                              <PencilSvg />
                            </BorderlessButton>
                          </View>

                          <View style={styles.hash}>
                            <Text
                              color={colors.light.neutralColor7}
                              fontsSize={fontsSize.xs12}
                              fontFamily={fontsFamily.montserrat.regular400}
                              textDescription={hash}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            />
                            <BorderlessButton style={styles.hashImage} onPress={copyToClipboard}>
                              <Copy />
                            </BorderlessButton>
                          </View>

                          <View style={styles.userbio}>
                            <TextInput
                              style={styles.bioDescription}
                              value={newDescriptionValue}
                              multiline={true}
                              returnKeyType="send"
                              onChangeText={setNewDescriptionValue}
                              editable={isDescriptionEditing}
                              onSubmitEditing={handleSubmitEditingDescription}
                              ref={descriptionTextInputRef}
                              spellCheck={false}
                            />
                            <BorderlessButton
                              style={styles.editDescription}
                              onPress={
                                !isDescriptionEditing
                                  ? handleStartEditingDescription
                                  : handleSubmitEditingDescription
                              }>
                              <PencilSvg />
                            </BorderlessButton>
                          </View>
                        </View>

                        <View style={styles.arts}>
                          <ProfileButton
                            label={'Creations'}
                            isActive={creationsButtonSelected}
                            onPress={handleSelect}
                            disabled={creationsButtonSelected}
                          />
                          <ProfileButton
                            label={'Purchases'}
                            isActive={!creationsButtonSelected}
                            onPress={handleSelect}
                            disabled={!creationsButtonSelected}
                          />
                        </View>
                      </View>

                      <View style={styles.body}>
                        {creations.length === 0 && creationsButtonSelected && (
                          <>
                            <View style={styles.image}>
                              <EmptyCreationsSvg />
                              <View style={styles.description}>
                                <Text
                                  textDescription={
                                    'You have no creations yet. Click bellow to make your first one!'
                                  }
                                  fontsSize={fontsSize.md16}
                                  fontFamily={fontsFamily.montserrat.medium500}
                                  color={colors.light.neutralColor5}
                                  textAlign={AlignTypes.CENTER}
                                />
                              </View>

                              <LineButton
                                label={'Create a NFT'}
                                textFontFamily={fontsFamily.montserrat.medium500}
                                textColor={colors.light.neutralColor4}
                                textFontSize={fontsSize.md16}
                                textAlign={AlignTypes.CENTER}
                              />
                            </View>
                          </>
                        )}
                        {purchases.length === 0 && !creationsButtonSelected && (
                          <>
                            <View style={styles.image}>
                              <EmptyPurchasesSvg />
                              <View style={styles.description}>
                                <Text
                                  textDescription={
                                    'You have no purchases yet. Click bellow to buy your first one!'
                                  }
                                  fontsSize={fontsSize.md16}
                                  fontFamily={fontsFamily.montserrat.medium500}
                                  color={colors.light.neutralColor5}
                                  textAlign={AlignTypes.CENTER}
                                />
                              </View>

                              <LineButton
                                label={'Buy a NFT'}
                                textFontFamily={fontsFamily.montserrat.medium500}
                                textColor={colors.light.neutralColor4}
                                textFontSize={fontsSize.md16}
                                textAlign={AlignTypes.CENTER}
                              />
                            </View>
                          </>
                        )}
                        {creations.length > 0 && creationsButtonSelected && (
                          <View style={styles.nftsImages}>
                            {creations.map((data) => {
                              return <NftImage key={data.id} uri={data.uri} />;
                            })}
                          </View>
                        )}
                        {purchases.length > 0 && !creationsButtonSelected && (
                          <View style={styles.nftsImages}>
                            {purchases.map((data) => {
                              return <NftImage key={data.id} uri={data.uri} />;
                            })}
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </TouchableOpacity>
      ) : (
        <ConnectWallet />
      )}
      {!user.id && (
        <SafeAreaView style={[styles.container, { flex: 1 }]}>
          <View style={styles.header}>
            <View style={styles.logo}>
              <HipaLogoSVG />
              <View style={{ paddingRight: 8 }} />
              <HIPASVG />
            </View>
            <View style={styles.buttons}>
              <SquareButton iconChildren={MenuSvg} />
            </View>
          </View>

          <View style={styles.title}>
            <Text
              color={colors.light.neutralColor5}
              fontFamily={fontsFamily.montserrat.semiBold600}
              fontsSize={fontsSize.xl20}
              textDescription={'Profile'}
            />
          </View>
          <View style={styles.emptyProfileContainer}>
            <View style={styles.emptyImage}>
              <Image source={require('../../../assets/empty-profile.png')} />
            </View>
            <View style={styles.emptyProfileText1}>
              <Text
                color={colors.light.neutralColor5}
                fontFamily={fontsFamily.montserrat.medium500}
                fontsSize={fontsSize.md16}
                textAlign={AlignTypes.CENTER}
                textDescription={"You're not connected with your wallet! Please connect it first."}
              />
            </View>
            <View style={styles.emptyProfileText2}>
              <Text
                color={colors.light.neutralColor5}
                fontFamily={fontsFamily.montserrat.medium500}
                fontsSize={fontsSize.md16}
                textAlign={AlignTypes.CENTER}
                textDescription={'Make sure you have the Valora app already installed.'}
              />
            </View>
            <View style={styles.emptyProfileLineButton}>
              <LineButton
                label={'Connect Wallet'}
                textFontFamily={fontsFamily.montserrat.medium500}
                textColor={colors.light.neutralColor4}
                textFontSize={fontsSize.md16}
                textAlign={AlignTypes.CENTER}
                onPress={openModal}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Profile;
