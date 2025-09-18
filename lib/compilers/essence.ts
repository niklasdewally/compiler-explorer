// "Compilers" for essence

import {BaseCompiler} from '../base-compiler.js';


export class ConjureOxideCompiler extends BaseCompiler {
  static get key() {
    return 'essence-oxide';
  }

  // options to use to call oxide
  protected override optionsForFilter(
      filters: ParseFiltersAndOutputOptions,
      outputFilename: string,
      userOptions?: string[]
  ): string[] {
      let options = ['solve', '--no-run-solver', '--save-solver-input-file',this.filename(outputFilename)];
      return options;
  }

  override getCompilerResultLanguageId(filters?) {
      return 'no-language';
  }

}


// savilerow must have different "compilers" for each solver, as the -out- flags are different
abstract class SavileRowBaseCompiler extends BaseCompiler {
    protected abstract get solver() : string;

    protected override optionsForFilter(
      filters: ParseFiltersAndOutputOptions,
      outputFilename: string,
      userOptions?: string[]
    ): string[] {
      let options = [`-${this.solver}`, `-out-${this.solver}`,this.filename(outputFilename)];
      return options;
    }

    override getCompilerResultLanguageId(filters?) {
        return 'no-language';
  }
}

export class SavileRowMinionCompiler extends SavileRowBaseCompiler {

    protected override get solver() : string {
        return 'minion';
    }

    static get key() {
        return `essence-savilerow-minion`
    }
}

export class SavileRowSmtCompiler extends SavileRowBaseCompiler {

    protected override get solver() : string {
        return 'smt';
    }

    static get key() {
        return `essence-savilerow-smt`
    }
}

export class SavileRowSatCompiler extends SavileRowBaseCompiler {

    protected override get solver() : string {
        return 'sat';
    }

    static get key() {
        return `essence-savilerow-sat`
    }
}
