import { customAlphabet } from 'nanoid';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

export const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  15,
);

const random = (array: string[]) => {
  return Math.floor(Math.random() * array.length);
};

export const generateRandomUserPicture = (username: string) => {
  const background = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'];
  const eyebrows = [
    'variant01',
    'variant02',
    'variant03',
    'variant04',
    'variant05',
    'variant06',
    'variant07',
    'variant08',
    'variant09',
    'variant10',
    'variant11',
    'variant12',
    'variant13',
    'variant14',
    'variant15',
  ];
  const eyes = [
    'variant01',
    'variant02',
    'variant03',
    'variant04',
    'variant05',
    'variant06',
    'variant07',
    'variant08',
    'variant09',
    'variant10',
    'variant11',
    'variant12',
    'variant13',
    'variant14',
    'variant15',
    'variant16',
    'variant17',
    'variant18',
    'variant19',
    'variant20',
    'variant21',
    'variant22',
    'variant23',
    'variant24',
    'variant25',
    'variant26',
  ];
  const hair = [
    'long01',
    'long02',
    'long03',
    'long04',
    'long05',
    'long06',
    'long07',
    'long08',
    'long09',
    'long10',
    'long11',
    'long12',
    'long13',
    'long14',
    'long15',
    'long16',
    'long17',
    'long18',
    'long19',
    'long20',
    'long21',
    'long22',
    'long23',
    'long24',
    'long25',
    'long26',
    'short01',
    'short02',
    'short03',
    'short04',
    'short05',
    'short06',
    'short07',
    'short08',
    'short09',
    'short10',
    'short11',
    'short12',
    'short13',
    'short14',
    'short15',
    'short16',
    'short17',
    'short18',
    'short19',
  ];
  const hairColor = [
    '0e0e0e',
    '3eac2c',
    '6a4e35',
    '85c2c6',
    '796a45',
    '562306',
    '592454',
    'ab2a18',
    'ac6511',
    'afafaf',
    'b9a05f',
    'cb6820',
    'dba3be',
    'e5d7a3',
  ];
  const mouth = [
    'variant01',
    'variant02',
    'variant03',
    'variant04',
    'variant05',
    'variant06',
    'variant07',
    'variant08',
    'variant09',
    'variant10',
    'variant11',
    'variant12',
    'variant13',
    'variant14',
    'variant15',
    'variant16',
    'variant17',
    'variant18',
    'variant19',
    'variant20',
    'variant21',
    'variant22',
    'variant23',
    'variant24',
    'variant25',
    'variant26',
    'variant27',
    'variant28',
    'variant29',
    'variant30',
  ];

  return `https://api.dicebear.com/5.x/adventurer/svg?seed=${username}&&size=400&&backgroundColor=${
    background[random(background)]
  }&&eyebrows=${eyebrows[random(eyebrows)]}&&eyes=${eyes[random(eyes)]}&&hair=${
    hair[random(hair)]
  }&&hairColor=${hairColor[random(hairColor)]}&&mouth=${mouth[random(mouth)]}`;
};

export const generateHashPassword = async (
  password: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const loggerInfo = (data: any) => {
  // check if data is primitive
  if (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'boolean'
  ) {
    console.log(`[LOG] ${new Date().toISOString()}`, data);
  } else {
    console.log(`[LOG] ${new Date().toISOString()}`);
    console.log(data);
  }
};

export const loggerError = (data: any) => {
  // check if data is primitive
  if (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'boolean'
  ) {
    console.error(`[ERROR] ${new Date().toISOString()}`, data);
  } else {
    console.error(`[ERROR] ${new Date().toISOString()}`);
    console.error(data);
  }
};
