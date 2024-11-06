const avatarUrlsMale = [
  'https://avataaars.io/?avatarStyle=Transparent&topType=Turban&accessoriesType=Prescription01&hatColor=Gray02&facialHairType=BeardMajestic&facialHairColor=Red&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Bear&eyeType=Close&eyebrowType=SadConcerned&mouthType=Grimace&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Sunglasses&hatColor=Red&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=BlazerSweater&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Smile&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat1&accessoriesType=Prescription01&hatColor=Pink&facialHairType=Blank&clotheType=BlazerShirt&clotheColor=Pink&eyeType=Side&eyebrowType=UnibrowNatural&mouthType=Sad&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads02&accessoriesType=Sunglasses&hairColor=Platinum&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=Overall&clotheColor=PastelOrange&eyeType=Cry&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Wink&eyebrowType=AngryNatural&mouthType=Smile&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurly&accessoriesType=Kurt&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Blonde&clotheType=CollarSweater&clotheColor=PastelOrange&eyeType=EyeRoll&eyebrowType=UpDown&mouthType=Smile&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Round&hairColor=Black&facialHairType=Blank&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Resist&eyeType=Close&eyebrowType=SadConcerned&mouthType=Disbelief&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Prescription01&hairColor=Brown&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=PastelRed&eyeType=Hearts&eyebrowType=SadConcerned&mouthType=Smile&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Kurt&hairColor=BlondeGolden&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=White&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Tanned',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Round&hatColor=PastelOrange&hairColor=BlondeGolden&facialHairType=BeardMajestic&facialHairColor=Brown&clotheType=Overall&clotheColor=Gray02&graphicType=SkullOutline&eyeType=Hearts&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Sunglasses&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=White&eyeType=Close&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=BeardMajestic&facialHairColor=Red&clotheType=GraphicShirt&clotheColor=PastelGreen&graphicType=Hola&eyeType=Dizzy&eyebrowType=UpDown&mouthType=Disbelief&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription02&hairColor=Red&facialHairType=MoustacheMagnum&facialHairColor=Platinum&clotheType=Hoodie&clotheColor=PastelOrange&eyeType=Cry&eyebrowType=RaisedExcited&mouthType=Tongue&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Brown&clotheType=CollarSweater&clotheColor=Heather&graphicType=Cumbia&eyeType=Surprised&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=Black',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=BlondeGolden&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=White&eyeType=Dizzy&eyebrowType=AngryNatural&mouthType=Tongue&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Round&hatColor=Gray01&hairColor=PastelPink&facialHairType=BeardMajestic&facialHairColor=BlondeGolden&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Wink&eyebrowType=AngryNatural&mouthType=Vomit&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=PastelRed&eyeType=Default&eyebrowType=UpDown&mouthType=Grimace&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Round&hairColor=Black&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=ShirtScoopNeck&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat2&accessoriesType=Prescription02&hatColor=PastelOrange&hairColor=Platinum&facialHairType=BeardMedium&facialHairColor=Red&clotheType=BlazerShirt&clotheColor=Blue01&eyeType=Wink&eyebrowType=Default&mouthType=Twinkle&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairDreads&accessoriesType=Kurt&hairColor=Platinum&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&clotheColor=Gray01&eyeType=Squint&eyebrowType=SadConcerned&mouthType=Vomit&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Prescription01&hatColor=PastelRed&hairColor=Auburn&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=CollarSweater&clotheColor=Gray02&eyeType=EyeRoll&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=Black',
  'https://avataaars.io/?avatarStyle=Transparent&topType=NoHair&accessoriesType=Prescription01&hairColor=Brown&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=Angry&mouthType=Serious&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=Turban&accessoriesType=Sunglasses&hatColor=Blue03&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Resist&eyeType=Squint&eyebrowType=SadConcernedNatural&mouthType=ScreamOpen&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Wayfarers&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=Brown&clotheType=ShirtCrewNeck&clotheColor=PastelRed&graphicType=Hola&eyeType=Happy&eyebrowType=UpDown&mouthType=ScreamOpen&skinColor=Light',
];

const avatarUrlsFemale = [
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBigHair&accessoriesType=Kurt&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Pink&eyeType=EyeRoll&eyebrowType=SadConcerned&mouthType=Smile&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBob&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&facialHairColor=Red&clotheType=ShirtVNeck&clotheColor=PastelRed&eyeType=Hearts&eyebrowType=UpDownNatural&mouthType=Grimace&skinColor=Tanned',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight2&accessoriesType=Blank&hairColor=Platinum&facialHairType=Blank&clotheType=BlazerSweater&clotheColor=Blue02&eyeType=Squint&eyebrowType=UpDown&mouthType=Concerned&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=Blue&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Blue03&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Eating&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Kurt&facialHairType=Blank&clotheType=Overall&clotheColor=Blue02&eyeType=Default&eyebrowType=Default&mouthType=Sad&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=Hijab&accessoriesType=Blank&hatColor=Blue02&clotheType=ShirtVNeck&clotheColor=Pink&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurvy&accessoriesType=Sunglasses&hairColor=Red&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=FlatNatural&mouthType=Disbelief&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairDreads&accessoriesType=Wayfarers&hairColor=Blonde&facialHairType=Blank&clotheType=Overall&clotheColor=Blue01&eyeType=Side&eyebrowType=SadConcernedNatural&mouthType=Tongue&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=CollarSweater&clotheColor=PastelYellow&eyeType=Default&eyebrowType=Angry&mouthType=Eating&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraightStrand&accessoriesType=Prescription02&hairColor=Platinum&facialHairType=Blank&clotheType=Overall&clotheColor=PastelBlue&eyeType=Surprised&eyebrowType=SadConcernedNatural&mouthType=Smile&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFrida&accessoriesType=Prescription02&facialHairType=Blank&facialHairColor=Platinum&clotheType=GraphicShirt&clotheColor=Black&graphicType=Hola&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Tanned',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Sunglasses&hairColor=Blonde&facialHairType=Blank&clotheType=Overall&clotheColor=PastelOrange&eyeType=Side&eyebrowType=UnibrowNatural&mouthType=Sad&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFrida&accessoriesType=Wayfarers&facialHairType=Blank&facialHairColor=Blonde&clotheType=BlazerShirt&eyeType=Close&eyebrowType=FlatNatural&mouthType=Eating&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairDreads&accessoriesType=Prescription02&hairColor=Auburn&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=PastelGreen&eyeType=Squint&eyebrowType=SadConcernedNatural&mouthType=Tongue&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Prescription02&hairColor=Brown&facialHairType=Blank&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=PastelOrange&graphicType=Cumbia&eyeType=Surprised&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=Hijab&accessoriesType=Prescription02&hatColor=Blue03&hairColor=PastelPink&facialHairType=MoustacheMagnum&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Bat&eyeType=WinkWacky&eyebrowType=DefaultNatural&mouthType=Tongue&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairDreads&accessoriesType=Wayfarers&hairColor=Platinum&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Brown',
];
const getMaleAvatar = () => {
  return avatarUrlsMale[Math.floor(Math.random() * avatarUrlsMale.length)];
};
const getFemaleAvatar = () => {
  return avatarUrlsFemale[Math.floor(Math.random() * avatarUrlsFemale.length)];
};
const getRandomAvatarbyGender = (gender) => {
  switch (gender) {
    case 'male':
      return getMaleAvatar();
    case 'female':
      return getFemaleAvatar();
    case 'other':
      return 'https://avatar.iran.liara.run/public/job/operator/female';
  }
};
module.exports = { getRandomAvatarbyGender };
