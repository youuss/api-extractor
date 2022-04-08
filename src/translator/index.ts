/**
 * @description default token translator
 * @author 阿怪
 * @date 2022/4/3 9:53 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { getFileDoc } from "./getFileDoc";
import { apiTreeCreator } from "./apiTreeCreator";
import type { Tokens } from "../extractor/tools/tokenExtractor";
import type { JhAPI } from "../../types/janghood-api-extractor";
import { jWarn } from "../common/console";

const tokensValidate = (tokens: Tokens) => {
  if (tokens.length === 0) {
    jWarn('this file is empty');
    return true;
  }
  return false;
}


export const translator = (baseToken: Tokens, fileName: string): JhAPI | undefined => {
  if (tokensValidate(baseToken)) {
    return;
  }
  let apiToken = baseToken;
  let doc;
  try {
    let docInfo = getFileDoc(baseToken);
    if (docInfo) {
      apiToken = docInfo.tokens;
      doc = docInfo.fileDoc;
    }
  } catch (e) {
    jWarn(`file ${fileName} throw error: ${(e as Error).message}`)
  }
  const children = apiTreeCreator(apiToken);

  return {
    //  to fix path info
    name: fileName,
    doc,
    children
  }

}
