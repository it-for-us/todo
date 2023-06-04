package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.service.WorkspaceService;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/work-space")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping("/{workspaceId}")
    public ResponseEntity<WorkspaceViewDto> getWorkspaceWithBoardsById(@PathVariable("workspaceId") Long workspaceId) {
        WorkspaceViewDto workspaceViewDto = workspaceService.getWorkspaceById(workspaceId);
        return new ResponseEntity<>(workspaceViewDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<WorkspaceViewDto>> getAllWorkspacesOfUser() {

        return new ResponseEntity<>(workspaceService.getAllWorkspacesOfUser(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WorkspaceViewDto> createWorkspace(@RequestBody WorkspaceCreateDto workspaceCreateDto) {
        WorkspaceViewDto workspaceViewDto = workspaceService.create(
                workspaceCreateDto,
                LoggedUsername.getUsernameFromAuthentication()
        );
        return new ResponseEntity<>(workspaceViewDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkspace(@PathVariable Long id) {
        workspaceService.deleteWorkspaceById(id, LoggedUsername.getUsernameFromAuthentication());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //update username and workspace name
    @PutMapping
    public ResponseEntity<WorkspaceViewDto> updateWorkspace(@RequestBody WorkspaceCreateDto workspaceCreateDto) {

        return new ResponseEntity<>(workspaceService.updateWorkspace(workspaceCreateDto), HttpStatus.OK);
    }

}


