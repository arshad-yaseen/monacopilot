'use client';

import {useEffect, useState} from 'react';

import MonacoEditor from '@monaco-editor/react';
import {
  registerCompletion,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

export default function Home() {
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const completion = registerCompletion(monaco, editor, {
      endpoint: '/api/complete',
      language: 'javascript',
      externalContext:[
        {
          path:'./global.d.ts',
          content:`
          /**
          * 合同状态枚举
          */
         declare enum ContractStatus {
           DRAFT = 'DRAFT',           // 草稿
           PENDING = 'PENDING',       // 待审核
           ACTIVE = 'ACTIVE',         // 生效中
           COMPLETED = 'COMPLETED',   // 已完成
           TERMINATED = 'TERMINATED'  // 已终止
         }
         
         /**
          * 合同对象接口定义
          */
         declare interface Contract {
           /** 合同唯一标识 */
           id: string;
           
           /** 合同编号 */
           contractNumber: string;
           
           /** 合同标题 */
           title: string;
           
           /** 合同状态 */
           status: ContractStatus;
           
           /** 合同签订日期 */
           signedDate: Date;
           
           /** 合同生效日期 */
           effectiveDate: Date;
           
           /** 合同到期日期 */
           expirationDate: Date;
           
           /** 合同总金额（单位：分） */
           amount: number;

           /** 合同折扣（如：0.3，就是 3 折） */
           discount: number;
           
           /** 合同双方 */
           parties: {
             /** 甲方信息 */
             partyA: {
               name: string;
               representative: string;
               contactInfo: string;
             };
             /** 乙方信息 */
             partyB: {
               name: string;
               representative: string;
               contactInfo: string;
             };
           };
           
           /** 合同备注 */
           remarks?: string;
         }

         @example
          * // 基础计算示例
          * const num1 = new $util.mapNumber(10.5);
          * const num2 = new $util.mapNumber('20.3');
          * const sum = num1.plus(num2);  // 30.8
          * const product = num1.multiply(num2); // 213.15
         declare class MapNumber {
          /**
           * 构造函数
           * @param value 初始值
           */
          constructor(value: number | string | MapNumber);
        
          /**
           * 加法运算
           * @param value 要相加的数值
           * @returns MapNumber 实例
           */
          plus(value: number | string | MapNumber): MapNumber;
        
          /**
           * 减法运算
           * @param value 要相减的数值
           * @returns MapNumber 实例
           * @example
           * const price = new $util.mapNumber('10.5');
           * const quantity = new $util.mapNumber(3);
           * const total = price.multiply(quantity); // 31.5
           */
          minus(value: number | string | MapNumber): MapNumber;
        
          /**
           * 乘法运算
           * @param value 要相乘的数值
           * @returns MapNumber 实例
           */
          multiply(value: number | string | MapNumber): MapNumber;
        }
        
        /**
         * 全局工具对象声明
         * @example
         * // 创建新的 MapNumber 实例
         * const num = new $util.mapNumber(100);
         * 
         * // 链式计算
         * const result = new $util.mapNumber(10)
         *     .plus(20)
         *     .multiply(2)
         *     .minus(15);
         * 
         */
        declare namespace $util {
          export const mapNumber: typeof MapNumber;
        }
        
        /**
         * 全局表单对象声明
         * @example
        * // 获取表格数据并进行汇总计算
        * var formData = $grid.getData();
        * const totalAmount = new $util.mapNumber(formData.totalAmount);
        * const amount = price.multiply(formData.discount); 
         */
        declare namespace $form {
          export function getData<T = any>(): T[];
        }
      
         `
        }
      ]
    });

    return () => {
      completion.deregister();
    };
  }, [monaco, editor]);

  const defaultValue = `
// 从表单获取合同对象
var contactData = $form.getData();

// 获取当前合同金额(这里回车)


// 获取折扣计算后的金额(这里回车)


  `
  return (
    <main>
      <MonacoEditor
        language="javascript"
        value={defaultValue}
        height={'100vh'}
        width={'100%'}
        onMount={(editor, monaco) => {
          setEditor(editor);
          setMonaco(monaco);
        }}
      />
    </main>
  );
}
