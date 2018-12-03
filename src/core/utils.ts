import {Villager} from './model';

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const getRandomArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getAliveVillagers = (villagers: Villager[]) => villagers.filter((villager: Villager) => villager.alive);

export const getFaith = (villagers: Villager[]) => {
  return (
    villagers.reduce((faith: number, villager: Villager) => {
      return faith + villager.faith;
    }, 0) / villagers.length
  );
};

export const getTrust = (villagers: Villager[]) => {
  return (
    villagers.reduce((trust: number, villager: Villager) => {
      return trust + villager.trust;
    }, 0) / villagers.length
  );
};

export const loadAssets = async (assetPaths: string[], onUpdate: (progress: number) => void) => {
  let assetDownloadedCount = 0;

  return Promise.all(
    assetPaths.map(async (path: string) => {
      await loadAsset(path);
      assetDownloadedCount++;
      onUpdate(assetDownloadedCount / assetPaths.length);
    })
  );
};

const loadAsset = async (path: string): Promise<void> => {
  const extension = path.split('.').pop();
  const basePath = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/';

  switch (extension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return new Promise<void>((resolve: any) => {
        const downloadingImage = new Image();
        downloadingImage.onload = () => {
          resolve();
        };
        downloadingImage.src = path;
      });
      break;

    case 'mp4':
    case 'ogg':
    case 'mov':
      return new Promise<void>((resolve: any) => {
        const downloadingVideo = document.createElement('video');
        downloadingVideo.muted = true;
        downloadingVideo.src = basePath + path;
        downloadingVideo.play().then(() => {
          resolve();
        });
      });
      break;

    case 'mp3':
    case 'm4a':
      return new Promise<void>((resolve: any) => {
        const downloadingAudio = new Audio();
        downloadingAudio.addEventListener(
          'canplaythrough',
          () => {
            resolve();
          },
          false
        );
        downloadingAudio.src = basePath + path;
        downloadingAudio.muted = true;
        downloadingAudio.load();
      });
      break;

    default:
      break;
  }
};
