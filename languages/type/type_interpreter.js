// Type code
Peremens = {}; TypeData = {}; TypeOut = document.getElementById('root'); TypeData.program; TypeOutHead = document.getElementById('head'); TypeOutTitle = document.getElementById('title');
TypeCommands = {
  "console_log": function(c) { console.log(GetTypeReporter(c)) },
  "console_error": function(c) { console.error(GetTypeReporter(c)) },
  "console_warn": function(c) { console.warn(GetTypeReporter(c)) },
  "let": function(n, z) { let Peremens[GetTypeReporter(n)] = GetTypeReporter(z) },
  "var": function(n, z) { Peremens[GetTypeReporter(n)] = GetTypeReporter(z) },
  "if": function(b, c) { if (b) { eval(RunTypeCode(GetTypeReporter(c))) } },
  "if else": function(b, c, e) { if (b) { eval(RunTypeCode(GetTypeReporter(c))) } else { eval(RunTypeCode(GetTypeReporter(e))) } },
  "eval": function(c) { eval(RunTypeCode(GetTypeReporter(c))) },
  "return": function(z) { return GetTypeReporter(z) },
  "const": function(n, z) { const Peremens[GetTypeReporter(n)] = GetTypeReporter(z) },
  "json": function(p, e, z) { Peremens[GetTypeReporter(p)] = eval(`Peremens[${GetTypeReporter(p)}].${GetTypeReporter(e)} = ${GetTypeReporter(z)}`) },
  "for": function(e, c) { for(GetTypeReporter(e)) { RunTypeCode(GetTypeReporter(c)) } },
  "while": function(i, c) { while (GetTypeReporter(i)) { RunTypeCode(GetTypeReporter(c)) } },
  "Sys": function(c) { TypeLang.sys = {}; i++; TypeLang.sys.code = TypeSysFunc['let a sys()'](TypeLang.command); for(TypeLang.sys.i = 0; TypeLang.sys.i < TypeLang.sys.code.length; TypeLang.sys.i++) { TypeLang.sys.command = TypeLang.sys.code[TypeLang.sys.i]; eval(`TypeSysCommands.${TypeLang.sys.command}`); } }
}
TypeReporters = {
  "text": function(t) { return t },
  "==": function(a, b) { return a === b },
  "<": function(a, b) { return a < b },
  ">": function(a, b) { return a > b },
  "eval": function(c) { eval(RunTypeCode(c)) },
  "typeof": function(t) { return typeof t },
  "var": function(n) { return Peremens[n] },
  "new string": function() { return '' },
  "new number": function() { return 0 },
  "new array": function() { return [] },
  "new object": function() { return {} },
  "json": function(p, e) { return eval(`Peremens[p].${e}`) },
  "true": function() { return true },
  "false": function() { return false },
  "not": function(b) { return !b },
  "<=": function(a, b) { return a <= b },
  ">=": function(a, b) { return a >= b },
  "and": function(a, b) { return a && b },
  "or": function(a, b) { return a || b }
}
TypeSysCommands = {
  "#name": function(n) { TypeData.name = n },
  "#agent": function(a) { TypeData.agent = a },
  "#pass": function(p) { TypeData.pass = p },
  "#programm": function(p) {
    TypeData.program = {}; TypeData.program.sys = {}; TypeData.program.sys.code = p.split("%");
    for(TypeData.program.sys.i; TypeData.program.sys.i < TypeData.program.sys.code.length; TypeData.program.sys.i++) {
      TypeData.program.sys.command = TypeData.program.sys.code[TypeData.program.sys.i]
      eval(`TypeSysProgrammCommands.${TypeData.program.sys.command}`)
    }
  },
}
TypeData.programm = {}
TypeSysProgrammCommands = {
  "#name": function(n) { TypeData.programm.name = n },
  "#agent": function(a) { TypeData.programm.agent = a },
  "#version": function(v) { TypeData.programm.version = v },
  "#creator": function(n) { TypeData.programm.creator = n },
}
function RunTypeCode(c) {
  TypeLang = {}
  codeType = c.split("@;")
  TypeSysFunc = {
    "let a main()": function(c) { return c.split(";") },
    "let a sys()": function(c) { return c.split("$") }
  }
  for(i = 0; i < codeType.length; i++) {
    TypeLang.command = codeType[i]
    if (TypeLang.command === 'let a main(type)') {
      TypeLang.main = {}; i++; TypeLang.main.code = TypeSysFunc['let a main()'](TypeLang.command)
      for(TypeLang.main.i = 0; TypeLang.main.i < TypeLang.main.code.length; TypeLang.main.i++) {
        TypeLang.main.command = TypeLang.main.code[TypeLang.main.i]
        eval(`TypeCommands.${TypeLang.main.command}`)
      }
    } else if (TypeLang.command === 'let a sys()') {
      TypeLang.sys = {}; i++; TypeLang.sys.code = TypeSysFunc['let a sys()'](TypeLang.command);
      for(TypeLang.sys.i = 0; TypeLang.sys.i < TypeLang.sys.code.length; TypeLang.sys.i++) {
        TypeLang.sys.command = TypeLang.sys.code[TypeLang.sys.i]
        eval(`TypeSysCommands.${TypeLang.sys.command}`)
      }
    }
  }
}
function GetTypeReporter(r) {
  return eval(`TypeReporters.${r}`)
}
function processTypeCodeScripts() {
  const typeCodeScripts = document.querySelectorAll('script[type="text/Type-Programm"]');
  typeCodeScripts.forEach(scriptElement => {
    if (scriptElement.src) {
      fetch(scriptElement.src)
        .then(response => response.text())
        .then(codeText => {
          RunTypeCode(codeText);
        })
        .catch(error => {
          console.error('Ошибка загрузки кода яыка программирования Type:', error);
        });
    } else {
      const codeText = scriptElement.textContent;
      RunTypeCode(codeText);
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  processTypeCodeScripts();
});
