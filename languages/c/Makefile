CC = arm-linux-androideabi-gcc
CFLAGS = -Wall -O2
TARGET = libnative.so

all: $(TARGET)

$(TARGET): native_utils.c
	$(CC) $(CFLAGS) -shared -fPIC $^ -o $@

clean:
	rm -f $(TARGET)
