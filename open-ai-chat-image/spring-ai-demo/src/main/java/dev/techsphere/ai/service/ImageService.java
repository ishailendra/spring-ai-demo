package dev.techsphere.ai.service;

import org.springframework.ai.image.ImageOptions;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private final OpenAiImageModel openAiImageModel;

    public ImageService(OpenAiImageModel openAiImageModel) {
        this.openAiImageModel = openAiImageModel;
    }

    public ImageResponse generateImage(String prompt) {
        return openAiImageModel.call(new ImagePrompt(prompt));
    }

    public ImageResponse generateImageOptions(String prompt, String quality, Integer n, Integer height, Integer width) {
        return openAiImageModel.call(new ImagePrompt(prompt,
                OpenAiImageOptions.builder()
                        .withModel("dall-e-2")
                        .withQuality(quality)
                        .withN(n)
                        .withHeight(height)
                        .withWidth(width).build()));
    }
}
