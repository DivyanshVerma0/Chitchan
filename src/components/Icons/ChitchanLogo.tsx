import React from 'react';
import { Image, ImageProps } from '@chakra-ui/react';

export const ChitchanLogo: React.FC<ImageProps> = (props) => (
  <Image src="/images/chitchanbw.png" alt="Chitchan Logo" {...props} />
);

export default ChitchanLogo; 