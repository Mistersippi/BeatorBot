export const DEFAULT_TRACK_IMAGE = 'https://ik.imagekit.io/beatorbot/beatorbot-logo.jpg';  

export const GENRES = [
  'EDM',
  'Classical',
  'Country',
  'Jazz',
  'Rock',
  'Pop',
  'HipHop',
  'Ambient'
] as const;

export type Genre = typeof GENRES[number];

export const SUBGENRES: Record<Genre, string[]> = {
  'EDM': [
    'House',
    'Techno',
    'Trance',
    'Dubstep',
    'Drum & Bass',
    'Future Bass',
    'Electro',
    'Progressive House'
  ],
  'Classical': [
    'Baroque',
    'Romantic',
    'Contemporary',
    'Symphony',
    'Chamber Music',
    'Opera',
    'Piano',
    'Orchestral'
  ],
  'Country': [
    'Traditional',
    'Modern',
    'Bluegrass',
    'Country Pop',
    'Country Rock',
    'Western',
    'Nashville Sound',
    'Americana'
  ],
  'Jazz': [
    'Bebop',
    'Swing',
    'Cool Jazz',
    'Fusion',
    'Latin Jazz',
    'Smooth Jazz',
    'Free Jazz',
    'Big Band'
  ],
  'Rock': [
    'Alternative',
    'Classic Rock',
    'Hard Rock',
    'Indie Rock',
    'Metal',
    'Progressive Rock',
    'Punk',
    'Psychedelic'
  ],
  'Pop': [
    'Contemporary',
    'Dance Pop',
    'Indie Pop',
    'Synth Pop',
    'Power Pop',
    'Art Pop',
    'Electropop',
    'K-Pop'
  ],
  'HipHop': [
    'Trap',
    'Boom Bap',
    'Conscious',
    'Drill',
    'Lofi Hip Hop',
    'Alternative Hip Hop',
    'Southern Hip Hop',
    'Instrumental Hip Hop'
  ],
  'Ambient': [
    'Dark Ambient',
    'Space Ambient',
    'Drone',
    'Atmospheric',
    'Minimal',
    'Ambient Electronic',
    'New Age',
    'Environmental'
  ]
};
