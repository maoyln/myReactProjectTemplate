import { nanoId } from '../../utils';
import { isArrayEmpty } from '../../utils/isType';
export interface PureComponentSelectList {
  label: string;
  value: string;
}

export default class PureComponentSelectPubSub {
  private _code: string = '';

  private _selectData: { label: string; value: string; [x: string]: any }[] = [];

  private _activeValue: string = '';

  private _fns: Map<string, { (id: string): void }> = new Map();

  private _dataSource: any = null;
  get code() {
    return this._code;
  }
  get selectData() {
    return this._selectData;
  }
  get activeValue() {
    return this._activeValue;
  }

  get dataSource() {
    return this._dataSource;
  }

  constructor(code: string) {
    this._code = code;
  }
  public setSelectList(selectData: PureComponentSelectList[]) {
    if (isArrayEmpty(selectData)) {
      this._selectData = selectData;
      this._activeValue = selectData[0].value;
    }
  }

  public on(opt: { id?: string; cb: { (id: string): void } }) {
    opt.id = opt.id || nanoId();
    opt.cb(this._activeValue);
    this._fns.set(opt.id, opt.cb);
    return () => {
      this._fns.delete(opt.id as string);
    };
  }

  private _emit() {
    this._fns.forEach((v, k) => {
      v(this._activeValue);
    });
  }

  public onChange(value: string) {
    this._activeValue = value;
    this._emit();
  }

  public getActiveData(value: string) {
    return this._selectData.find((i) => i.value === value);
  }
}
