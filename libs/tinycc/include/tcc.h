#ifndef TCC_H
#define TCC_H

typedef struct TCCState TCCState;

TCCState* tcc_new();
int tcc_compile_string(TCCState* s, const char* buf);
int tcc_relocate(TCCState* s, void* mem);
int tcc_add_symbol(TCCState* s, const char* name, void* val);
void tcc_delete(TCCState* s);

#endif
