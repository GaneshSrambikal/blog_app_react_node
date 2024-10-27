const avatarUrlsMale = [
  'https://avatar.iran.liara.run/public/16',
  'https://avatar.iran.liara.run/public/48',
  'https://avatar.iran.liara.run/public/28',
  'https://avatar.iran.liara.run/public/30',
  'https://avatar.iran.liara.run/public/28',
  'https://avatar.iran.liara.run/public/9',
  'https://avatar.iran.liara.run/public/25',
  'https://avatar.iran.liara.run/public/44',
  'https://avatar.iran.liara.run/public/32',
  'https://avatar.iran.liara.run/public/7',
  'https://avatar.iran.liara.run/public/38',
  'https://avatar.iran.liara.run/public/11',
  'https://avatar.iran.liara.run/public/13',
  'https://avatar.iran.liara.run/public/34',
  'https://avatar.iran.liara.run/public/26',
  'https://avatar.iran.liara.run/public/36',
  'https://avatar.iran.liara.run/public/37',
];
const avatarUrlsFemale = [
  'https://avatar.iran.liara.run/public/54',
  'https://avatar.iran.liara.run/public/100',
  'https://avatar.iran.liara.run/public/69',
  'https://avatar.iran.liara.run/public/63',
  'https://avatar.iran.liara.run/public/81',
  'https://avatar.iran.liara.run/public/66',
  'https://avatar.iran.liara.run/public/79',
  'https://avatar.iran.liara.run/public/65',
  'https://avatar.iran.liara.run/public/98',
  'https://avatar.iran.liara.run/public/75',
  'https://avatar.iran.liara.run/public/58',
  'https://avatar.iran.liara.run/public/61',
  'https://avatar.iran.liara.run/public/60',
  'https://avatar.iran.liara.run/public/59',
  'https://avatar.iran.liara.run/public/83',
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
