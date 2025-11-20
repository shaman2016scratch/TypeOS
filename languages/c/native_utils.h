#include <stdio.h>
#include <stdlib.h>

// Пример функции для работы с памятью
void* allocate_buffer(int size) {
    return malloc(size);
}

// Функция для криптографии (упрощённо)
void encrypt_data(char* data, int key) {
    for (int i = 0; i < strlen(data); i++) {
        data[i] ^= key;
    }
}
