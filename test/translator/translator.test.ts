/**
 * @description translator test
 * @author 阿怪
 * @date 2022/4/19 00:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect } from 'vitest';
import { run } from "./tokenCreateTool";
import { translator } from "../../src/translator";
import { Tokens } from "../../src/extractor/tools/tokenExtractor";

test('expect translator return right JhAPI', async () => {

  const res = await run('example/merge/**.d.ts');

  expect(translator(res as Tokens, 'merge')).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "false",
                "type": "boolean",
              },
              "name": "border",
            },
            {
              "doc": {
                "required": "true",
                "type": "boolean|string",
              },
              "name": "disabled",
            },
            {
              "doc": {
                "required": "true",
                "type": "Array<any>",
              },
              "name": "type",
            },
            {
              "doc": {
                "required": "true",
                "type": "boolean",
              },
              "name": "K in ButtonType",
            },
          ],
          "intersections": [],
          "name": "ButtonProps",
        },
        {
          "children": [
            {
              "doc": {
                "required": "true",
                "type": "boolean",
              },
              "name": "K in ButtonType",
            },
          ],
          "name": "ButtonTypeProps",
        },
      ],
      "doc": undefined,
      "name": "merge",
    }
  `);


})

test('expect type with value is return right',async ()=>{
  const res = await run('example/pure/withValue.d.ts');
  expect(translator(res as Tokens,'withValue')).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "true",
                "type": "string|VNode[]|WithValue[]",
              },
              "name": "key",
            },
          ],
          "name": "WithValue",
        },
      ],
      "doc": undefined,
      "name": "withValue",
    }
  `);
})

test('expect function type param is return right',async ()=>{
  const res = await run('example/pure/functionValue.d.ts');
  expect(translator(res as Tokens,'functionValue')).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "false",
                "type": "string",
              },
              "name": "placeholder",
            },
            {
              "doc": {
                "required": "false",
                "type": "(option:any,value:any)=>Boolean",
              },
              "name": "toMatch",
            },
          ],
          "name": "FunctionValue",
        },
      ],
      "doc": undefined,
      "name": "functionValue",
    }
  `);
})
