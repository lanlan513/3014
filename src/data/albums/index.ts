import type { Album } from '../albums';

import { albumDetail as _3mm } from './3mm';
import { albumDetail as buXiangFangShou } from './bu-xiang-fang-shou';
import { albumDetail as chineseDream } from './chinese-dream';
import { albumDetail as cmonIn } from './cmon-in';
import { albumDetail as daDeHuoRe } from './da-de-huo-re';
import { albumDetail as deKuaiShiDai } from './de-kuai-shi-dai';
import { albumDetail as easonChan1996 } from './eason-chan-1996';
import { albumDetail as fanZhengShiWo } from './fan-zheng-shi-wo';
import { albumDetail as h3m } from './h3m';
import { albumDetail as heiBaiHui } from './hei-bai-hui';
import { albumDetail as hunLiDeZhuFu } from './hun-li-de-zhu-fu';
import { albumDetail as lifeContinues } from './life-continues';
import { albumDetail as listenToEason } from './listen-to-eason';
import { albumDetail as liveForToday } from './live-for-today';
import { albumDetail as love } from './love';
import { albumDetail as nothingReallyMatters } from './nothing-really-matters';
import { albumDetail as qi } from './qi';
import { albumDetail as renARen } from './ren-a-ren';
import { albumDetail as renLeBa } from './ren-le-ba';
import { albumDetail as riceAndShine } from './rice-and-shine';
import { albumDetail as shallWeDance } from './shall-we-dance';
import { albumDetail as shangWuLou } from './shang-wu-lou';
import { albumDetail as sheJiaoKongJuAi } from './she-jiao-kong-ju-ai';
import { albumDetail as solidays } from './solidays';
import { albumDetail as strangerUnderSkin } from './stranger-under-skin';
import { albumDetail as tasteTheAtmosphere } from './taste-the-atmosphere';
import { albumDetail as theKey } from './the-key';
import { albumDetail as theLineUp } from './the-line-up';
import { albumDetail as tianYouAiRen } from './tian-you-ai-ren';
import { albumDetail as timeFlies } from './time-flies';
import { albumDetail as u87 } from './u87';
import { albumDetail as wenMa } from './wen-ma';
import { albumDetail as whatsGoingOn } from './whats-going-on';
import { albumDetail as yuWoChangZai } from './yu-wo-chang-zai';
import { albumDetail as zenMeYang } from './zen-me-yang';
import { albumDetail as zhunBeiZhong } from './zhun-bei-zhong';

export const albumDetails: Album[] = [
  _3mm,
  buXiangFangShou,
  chineseDream,
  cmonIn,
  daDeHuoRe,
  deKuaiShiDai,
  easonChan1996,
  fanZhengShiWo,
  h3m,
  heiBaiHui,
  hunLiDeZhuFu,
  lifeContinues,
  listenToEason,
  liveForToday,
  love,
  nothingReallyMatters,
  qi,
  renARen,
  renLeBa,
  riceAndShine,
  shallWeDance,
  shangWuLou,
  sheJiaoKongJuAi,
  solidays,
  strangerUnderSkin,
  tasteTheAtmosphere,
  theKey,
  theLineUp,
  tianYouAiRen,
  timeFlies,
  u87,
  wenMa,
  whatsGoingOn,
  yuWoChangZai,
  zenMeYang,
  zhunBeiZhong,
];

const albumMap = new Map<string, Album>(
  albumDetails.map((album) => [album.id, album])
);

export function getAlbumById(id: string): Album | undefined {
  return albumMap.get(id);
}
