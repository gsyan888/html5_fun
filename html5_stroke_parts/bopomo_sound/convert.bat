@ECHO OFF
REM https://stroke-order.learningweb.moe.edu.tw/bopomo_sound/F/F30.WAV

CLS
SETLOCAL ENABLEDELAYEDEXPANSION

FOR /L %%A IN (1, 1, 37) DO (
    SET stringCMD=ffmpeg -i https://stroke-order.learningweb.moe.edu.tw/bopomo_sound/F/F%%A.WAV f/f%%A.mp3
    !stringCMD!
    SET stringCMD=ffmpeg -i https://stroke-order.learningweb.moe.edu.tw/bopomo_sound/M/M%%A.WAV m/m%%A.mp3
    !stringCMD!
)