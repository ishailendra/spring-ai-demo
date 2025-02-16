package dev.techsphere.ai.controller;

import dev.techsphere.ai.service.ChatService;
import dev.techsphere.ai.service.ImageService;
import dev.techsphere.ai.service.RecipeService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GenAIController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final ChatService chatService;
    private final ImageService imageService;
    private final RecipeService recipeService;

    public GenAIController(ChatService chatService, ImageService imageService, RecipeService recipeService) {
        this.chatService = chatService;
        this.imageService = imageService;
        this.recipeService = recipeService;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt) {
        log.info("Asking question to AI");
        return chatService.getResponse(prompt);
    }

    @GetMapping("/ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt) {
        log.info("Asking questions to AI - Options");
        return chatService.getResponseOptions(prompt);
    }

    @GetMapping("/generate-image")
    public void generateImage(HttpServletResponse response, @RequestParam String prompt) throws IOException {
        log.info("Generating Image with AI");
        ImageResponse imageResponse = imageService.generateImage(prompt);
        String imageUrl = imageResponse.getResult().getOutput().getUrl();
        response.sendRedirect(imageUrl);

    }

    @GetMapping("/generate-image-options")
    public List<String> generateImageOptions(@RequestParam String prompt,
                                             @RequestParam(defaultValue = "hd") String quality,
                                             @RequestParam(defaultValue = "1") Integer n,
                                             @RequestParam(defaultValue = "1024") Integer height,
                                             @RequestParam(defaultValue = "1024") Integer width) {
        log.info("Generating Image with AI - Options");
        ImageResponse imageResponse = imageService.generateImageOptions(prompt, quality, n, height, width);
        return imageResponse.getResults().stream().map(result -> result.getOutput().getUrl()).toList();
    }

    @GetMapping("/create-recipe")
    public String createRecipe(@RequestParam String ingredients,
                                     @RequestParam(defaultValue = "any") String cuisine,
                                     @RequestParam(defaultValue = "") String dietaryRestrictions) {
        log.info("Creating recipe with AI");
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
    }
}
