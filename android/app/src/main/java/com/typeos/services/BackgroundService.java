package com.typeos.services;

import android.app.Service;
import android.content.Intent;

public class BackgroundService extends Service {
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Фоновые задачи (резервное копирование, мониторинг)
        return START_STICKY;
    }
}
