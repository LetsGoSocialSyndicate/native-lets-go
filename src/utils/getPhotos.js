/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react';
 import { CameraRoll } from 'react-native';

export getPhotos = (groupTypes = 'All', numberOfPhotos = 1000, assetType = 'Photos') => {
  return CameraRoll.getPhotos({
    groupTypes,
    first: numberOfPhotos,
    assetType,
  })
}
